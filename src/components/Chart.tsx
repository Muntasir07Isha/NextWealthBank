import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Chart({ transactions }) {
  const categories = [...new Set(transactions.map((t) => t.category))];
  const incomeData = categories.map(
    (category) =>
      transactions
        .filter((t) => t.category === category && t.credit > 0)
        .reduce((sum, t) => sum + t.credit, 0)
  );
  const expenseData = categories.map(
    (category) =>
      transactions
        .filter((t) => t.category === category && t.debit > 0)
        .reduce((sum, t) => sum + t.debit, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
}
