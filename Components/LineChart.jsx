import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

export default function LineChart() {
  const { data, loading, error } = useSelector((state) => state.chart);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if(!document.getElementById("chart_js")) {
      return
    }
    const ctx = document.getElementById("chart_js").getContext("2d");

    // Destroy previous chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row[0].match(/\d{2}:\d{2}/)),
        datasets: [
          {
            label: "NIFTY",
            data: data.map((row) => row[4]),
            borderColor: "green",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pointRadius: 2,
      },
    });

    setChartInstance(newChart);

    return () => newChart.destroy(); // Cleanup on unmount
  }, [data]);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return <canvas height={"200px"} id="chart_js"></canvas>;
}
