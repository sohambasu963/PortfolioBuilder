import React from "react";
import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { ChartOptions, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

ChartJS.register(TimeScale);

interface StockChartProps {
  historicalData: {
    symbol: string;
    data: number[];
    labels: string[];
  };
}

export default function StockChart({ historicalData }: StockChartProps) {
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "timeseries" as const,
        time: {
          unit: "month",
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem: any) {
            const label = tooltipItem[0].label.split(",");
            return label[0] + "," + label[1];
          },
        },
      },
    },
  };

  const chartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: "Adjusted Close",
        data: historicalData.data,
        borderColor: "#2A7A3F",
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} options={options} />;
}
