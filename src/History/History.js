import React, { Component } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';

class History extends Component {
    constructor() {
        super();
        this.state = {
            todayprice: {},
            yesterdayprice: {},
            twodaysprice: {},
            threedaysprice: {},
            fourdaysprice: {}
        }
        this.getBTCPrices = this.getBTCPrices.bind(this);
        this.getETHPrices = this.getETHPrices.bind(this);
        this.getLTCPrices = this.getLTCPrices.bind(this);
    }

    getETHPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }

    getBTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }

    getLTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }

    getTodayPrice() {
        let t = moment().unix()
        // axios.all is used to make concurrent API requests. these
        // requests were the functions we first created and they accept
        // an argument of the data required
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({ todayprice: f });
            }));
    }

    getYesterdayPrice() {
        let t = moment().subtract(1, 'days').unix();
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({ yesterdayprice: f });
            }));
    }

    getTwoDaysPrice() {
        let t = moment().subtract(2, 'days').unix();
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({ twodaysprice: f });
            }));
    }

    getThreeDaysPrice() {
        let t = moment().subtract(3, 'days').unix();
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({ threedaysprice: f });
            }));
    }

    getFourDaysPrice() {
        let t = moment().subtract(4, 'days').unix();
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({ fourdaysprice: f });
            }));
    }

    componentWillMount() {
        this.getTodayPrice();
        this.getYesterdayPrice();
        this.getTwoDaysPrice();
        this.getThreeDaysPrice();
        this.getFourDaysPrice();
    }

    render() {
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <h4>{this.state.todayprice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.todayprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.todayprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.yesterdayprice.data}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.yesterdayprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.yesterdayprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.twodaysprice.data}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.twodaysprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.twodaysprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.twodaysprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.threedaysprice.data}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.threedaysprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.threedaysprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.threedaysprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.fourdaysprice.data}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.fourdaysprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.fourdaysprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.fourdaysprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default History;