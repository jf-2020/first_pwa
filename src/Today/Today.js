import React, { Component } from 'react';
import './Today.css';
import axios from 'axios';
import Pusher from 'pusher-js';

class Today extends Component {
    constructor() {
        super();
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        };
    }

    sendPricePusher(data) {
        axios.post('/prices/new', {
            prices: data
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // this is called when an instance of a component is being created and
    // inserted into the DOM
    componentWillMount() {
        // establish a connection to Pusher
        this.pusher = new Pusher('APP_KEY', {
            cluster: 'CLUSTER',
            encrypted: true
        });
        // subscribe to the 'coin-prices' channel
        this.prices = this.pusher.subscribe('coin-prices');
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
            .then(response => {
                this.setState({
                    btcprice: response.data.BTC.USD,
                    ethprice: response.data.ETH.USD,
                    ltcprice: response.data.LTC.USD
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidMount() {
        // query the API every 10 seconds
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
                .then(response => {
                    this.sendPricePusher(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 10000);
        // bind the 'prices' event and use the data in it (price information)
        // to update the state values, thus, realtime changes
        this.prices.bind('prices', price => {
            this.setState({
                btcprice: price.prices.BTC.USD,
                ethprice: price.prices.ETH.USD,
                ltcprice: price.prices.LTC.USD
            });
        }, this);
    }

    render() {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcprice}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column eth--section">
                        <h5>${this.state.ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column ltc--section">
                        <h5>${this.state.ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today;