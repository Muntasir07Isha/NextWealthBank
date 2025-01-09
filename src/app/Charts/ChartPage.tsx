"use client";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAccounts } from "@/context/AccountContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartsPage() {
  const { transactions } = useAccounts(); // Fetch transactions dynamically using AccountContext
  const [view, setView] = useState<"income" | "expenses">("expenses");

  let totalIncome = 0;
  let totalExpenses = 0;
  const expenseBreakdown: { [category: string]: number } = {};
  const incomeBreakdown: { [category: string]: number } = {};

  // Process Transactions
  transactions.forEach((transaction) => {
    if (transaction.credit > 0) {
      totalIncome += transaction.credit;
      incomeBreakdown[transaction.category] =
        (incomeBreakdown[transaction.category] || 0) + transaction.credit;
    } else if (transaction.debit > 0) {
      totalExpenses += transaction.debit;
      expenseBreakdown[transaction.category] =
        (expenseBreakdown[transaction.category] || 0) + transaction.debit;
    }
  });

  // Prepare Chart Data
  const categories =
    view === "expenses"
      ? Object.keys(expenseBreakdown)
      : Object.keys(incomeBreakdown);
  const data =
    view === "expenses"
      ? categories.map((category) => expenseBreakdown[category] || 0)
      : categories.map((category) => incomeBreakdown[category] || 0);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: view === "expenses" ? "Expenses" : "Income",
        data: data,
        backgroundColor:
          view === "expenses"
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "16px", textAlign: "center", color:"ghostwhite", backgroundColor:"goldenrod" }}
      >
        Income & Expense Portfolio
      </Typography>

      {/* Summary Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ color: "green" }}>
          Total Income: ${totalIncome.toFixed(2)}
        </Typography>
        <Typography variant="h6" sx={{ color: "red" }}>
          Total Expenses: ${totalExpenses.toFixed(2)}
        </Typography>
      </Box>

      {/* Expense Breakdown by Category */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          {view === "expenses" ? "Expenses by Category" : "Income by Category"}
        </Typography>
        {categories.map((category) => (
          <Accordion key={category}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${category}-content`}
              id={`panel-${category}-header`}
            >
              <Typography sx={{fontFamily:"Arial"}}>
                {category}: $
                {view === "expenses"
                  ? expenseBreakdown[category].toFixed(2)
                  : incomeBreakdown[category].toFixed(2)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {transactions
                .filter(
                  (transaction) =>
                    transaction.category === category &&
                    (view === "income"
                      ? transaction.credit > 0
                      : transaction.debit > 0)
                )
                .map((transaction) => (
                  <Typography key={transaction.id}>
                    {transaction.description}: $
                    {view === "income"
                      ? transaction.credit.toFixed(2)
                      : transaction.debit.toFixed(2)}
                  </Typography>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Tabs for toggling view */}
      <Tabs
        value={view}
        onChange={(e, newValue) => setView(newValue)}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{ marginTop: "16px" }}
      >
        <Tab label="Expenses" value="expenses" />
        <Tab label="Income" value="income" />
      </Tabs>

      {/* Chart */}
      <Box sx={{ marginTop: "32px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "8px", textAlign: "center" }}
        >
          {view === "expenses"
            ? "Expense Breakdown by Category"
            : "Income Breakdown by Category"}
        </Typography>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
