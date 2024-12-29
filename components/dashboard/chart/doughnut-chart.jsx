import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ topicChart }) => {
  const totalTopics = topicChart.reduce((sum, topic) => sum + topic.total, 0);

  const data = {
    labels: topicChart.map((topic) => topic.topicName),
    datasets: [
      {
        label: "Topik Konsultasi",
        data: topicChart.map((topic) => topic.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Merah
          "rgba(54, 162, 235, 0.8)", // Biru
          "rgba(255, 206, 86, 0.8)", // Kuning
          "rgba(75, 192, 192, 0.8)", // Hijau
          "rgba(153, 102, 255, 0.8)", // Ungu
          "rgba(255, 159, 64, 0.8)", // Oranye
          "rgba(128, 0, 0, 0.8)", // Maroon
          "rgba(0, 128, 128, 0.8)", // Teal
          "rgba(128, 128, 0, 0.8)", // Olive
          "rgba(0, 0, 128, 0.8)", // Navy
          "rgba(128, 0, 128, 0.8)", // Purple
          "rgba(0, 128, 0, 0.8)", // Dark Green
          "rgba(255, 192, 203, 0.8)", // Pink
          "rgba(173, 216, 230, 0.8)", // Light Blue
          "rgba(240, 230, 140, 0.8)", // Khaki
          "rgba(46, 139, 87, 0.8)", // Sea Green
          "rgba(70, 130, 180, 0.8)", // Steel Blue
          "rgba(210, 105, 30, 0.8)", // Chocolate
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(128, 0, 0, 1)",
          "rgba(0, 128, 128, 1)",
          "rgba(128, 128, 0, 1)",
          "rgba(0, 0, 128, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(255, 192, 203, 1)",
          "rgba(173, 216, 230, 1)",
          "rgba(240, 230, 140, 1)",
          "rgba(46, 139, 87, 1)",
          "rgba(70, 130, 180, 1)",
          "rgba(210, 105, 30, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            size: 14,
          },
          color: "#000000", // Warna label hitam
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const topicName = context.label || "";
            const value = context.raw || 0;
            const percentage = topicChart.find((topic) => topic.topicName === topicName)?.percentage || 0; // Ambil persentase langsung dari data
            return `${topicName}: ${value} (${percentage}%)`; // Format tooltip
          },
        },
      },
    },
  };
  

  // Plugin untuk menampilkan teks di tengah
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bold 24px Arial";
      ctx.fillStyle = "#000"; // Warna teks
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = width / 2 - 60; // Geser 20px ke kiri
      const centerY = height / 2;
      ctx.fillText(totalTopics, centerX, centerY);
      ctx.restore();
    },
  };

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default DoughnutChart;
