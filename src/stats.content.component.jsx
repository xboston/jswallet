import React from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { statistics } from 'blockchain.info';

class StatsContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        statistics.getChartData('market-price', { timespan: '90d' }).then((results) => {
            const mapped = results.map((raw) => {

                const date = new Date(raw.x * 1000);
                const day = date.getDay() + 1;
                const month = date.getMonth() + 1;
                const year = date.getFullYear().toString().slice(-2);
                const formatted = day + '/' + month + '/' + year;
                return {
                    date: formatted,
                    price: Number((raw.y).toFixed(1)),
                };
            });
            this.setState({ data: mapped, });
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
            </LineChart>
        );
    }

}

export default StatsContent;