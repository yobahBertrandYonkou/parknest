import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  return (
    <>
      <Line
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Test data",
              data: [32, 12, 45, 53, 12, 64, 67],
              backgroundColor: "#A6CEE3",
              borderColor: "#A6CEE3",
            },
          ],
        }}

        options={{
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                }
            },
        }}
      />
    </>
  );
}

function BarChart(labels: string[], data: number[], moreThanOne: boolean = false) {
  return (
    <>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Total income",
              data: data,
              backgroundColor: "#A6CEE3",
              borderColor: "#A6CEE3",
            }
          ],
        }}

        options={{
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                }
            },
        }}
      />
    </>
  );
}



export { LineChart, BarChart };
