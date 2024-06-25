import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getDataFromLocalStorage } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type AggregateDataType = {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
};

const Chart = () => {
  const getAggregatedData = (): AggregateDataType => {
    const income = getDataFromLocalStorage("Income-data") || [];
    const expense = getDataFromLocalStorage("Expense-data") || [];
    const mergedData = [...income, ...expense].sort((a, b) => {
      const dateA: string = a.date.split("-").reverse().join("");
      const dateB: string = b.date.split("-").reverse().join("");
      return dateA.localeCompare(dateB);
    });

    const aggregatedData: {
      [key: string]: { income: number; expense: number };
    } = {};

    mergedData.forEach((data) => {
      const dateKey = data.date;
      if (!aggregatedData[dateKey]) {
        aggregatedData[dateKey] = { income: 0, expense: 0 };
      }
      if (data.type === "Income") {
        aggregatedData[dateKey].income += Number(data.amount);
      } else if (data.type === "Expense") {
        aggregatedData[dateKey].expense += Number(Math.abs(data.amount));
      }
    });
    const uniqueDates = Object.keys(aggregatedData);
    const incomeData = uniqueDates.map((date) => aggregatedData[date].income);
    const expenseData = uniqueDates.map((date) => aggregatedData[date].expense);

    return { labels: uniqueDates, incomeData, expenseData };
  };

  const { labels, incomeData, expenseData } = getAggregatedData();

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: expenseData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Expenses over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
