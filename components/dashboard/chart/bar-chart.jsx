import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the datalabels plugin
);

const BarChart = ({ months, totals, title }) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: title,
        data: totals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Merah
          "rgba(54, 162, 235, 0.6)", // Biru
          "rgba(255, 206, 86, 0.6)", // Kuning
          "rgba(75, 192, 192, 0.6)", // Hijau
          "rgba(153, 102, 255, 0.6)", // Ungu
          "rgba(255, 159, 64, 0.6)", // Oranye
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
      datalabels: {
        display: true,
        color: "black", // Color of the label
        font: {
          weight: "semibold", // Make the text bold
        },
        formatter: (value) => value, // Format the value to be displayed (you can customize this)
        align: "end", // Posisikan angka di tengah secara vertikal
        anchor: "end", // Tetapkan posisi di dalam batang
        offset: -0, // Tambahkan jarak sedikit agar tidak terlalu dekat
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, // Keep horizontal grid lines enabled
          borderDash: [5, 5], // Makes the grid lines dotted (5px dashes, 5px gap)
          color: "rgba(0, 0, 0, 0.1)", // Optional: change the color of grid lines
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
