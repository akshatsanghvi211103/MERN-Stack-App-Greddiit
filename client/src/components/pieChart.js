import React from "react";
import Chart, { scales } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Reported vs Deleted</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Deleted vs Just Reported",
                        }
                    }
                }}
            />
        </div>
    );
}
export default PieChart;