import React from "react";
import Chart, { scales, Ticks } from 'chart.js/auto'
import { Line } from "react-chartjs-2";

export default function LineChart({ text, chartData }) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{text}</h2>
            <Line
                data={chartData}
                options={
                    {
                        plugins: {
                            title: {
                                display: true,
                                text: text
                            },
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: 'darkblue',
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#10106f',
                                }
                            }
                        }
                    }
                }
            />
        </div>
    );
}