import React from "react";

import Chart from "react-apexcharts";

import {PLAYERS_ARRAY, OOM_ROUNDS} from '../../utilities/constants';

import "./order-of-merit.css";

class OrderOfMeritChart extends React.Component {
    
    constructor(props) {
        super(props);

        let { yearOfCompetition } = this.props;
    
        this.state = {
            options: {
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333'
                },
                title: {
                    text: `Order of Merit ${yearOfCompetition}`,
                    align: 'center',
                    style: {
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }
                },
                xaxis: {
                    categories: OOM_ROUNDS,
                    title: {
                        text: 'Round Number',
                        style: {
                            fontSize: '18px'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Order of Merit points',
                        style: {
                            fontSize: '18px'
                        }
                    }
                },
                legend: {
                    show: true,
                    position: 'top'
                },
                tooltip: {
                    x: {
                        show: true,
                    }
                },
                // dataLabels: {
                //     enabled: true
                // },
                // shadow: {
                //     enabled: true,
                //     color: '#000',
                //     top: 18,
                //     left: 7,
                //     blur: 10,
                //     opacity: 1
                // },
                // annotations: {
                //     xaxis: [
                //         {
                //             x: '10',
                //             borderColor: "#00E396",
                //             label: {
                //             borderColor: "#00E396",
                //             style: {
                //                 color: "#fff",
                //                 background: "#00E396"
                //             },
                //             text: "Y Axis Annotation"
                //             }
                //         }
                //     ]
                // }
            },
            series: this.getChartScoresForPlayers()
        }
    }

    componentDidMount() {
        this.updateState();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.yearOfCompetition !== nextState.options.title.text) {
            this.updateState();
        }
        return true;
    }

    updateState = () => {
        this.setState({options: {...this.state.options, title: {...this.state.options.title, text: this.props.yearOfCompetition}}});
        this.setState({series: this.getChartScoresForPlayers()});
    }

    getChartScoresForPlayers = (oomCumulativePointsByRound) => {
        return (
            PLAYERS_ARRAY.map((player, playerNumber) => {
                return {
                    name: PLAYERS_ARRAY[playerNumber].toProperCase(),
                    data: this.props.oomCumulativePointsByRound.map(round => round[playerNumber])
                }
            })
        )
    }

    render() {

        return (
            <div className="container-oom-graph">
                <div className="container-oom-graph-row">
                    <div className="container-oom-graph-mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderOfMeritChart;