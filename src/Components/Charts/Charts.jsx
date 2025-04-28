import React, { useEffect } from "react";
import cookie from "react-cookies";
import Chart from "chart.js/auto";

export const Charts = ({ chartUsed }) => {
  useEffect(() => {
    let chartInstance;

    const createChart = () => {
      const incomes = cookie.load("incomes") || [];
      const expenses = cookie.load("expenses") || [];
      const currency = cookie.load("expense_currency")?.currency || "";

      const data = [...incomes, ...expenses].map(item => ({
        date: new Date(item.selectedDate).toLocaleDateString(),
        income: item.type === "income" ? item.amount : 0,
        expense: item.type === "expense" ? item.amount : 0,
      }));

      if (chartInstance) chartInstance.destroy();

      const ctx = document.getElementById("financialChart");
      chartInstance = new Chart(ctx, {
        type: chartUsed,
        data: {
          labels: data.map(d => d.date),
          datasets: [
            {
              label: "Income",
              data: data.map(d => d.income),
              backgroundColor: "green",
              borderColor: "green",
              borderWidth: 1,
            },
            {
              label: "Expense",
              data: data.map(d => d.expense),
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: `Amount (${currency})`,
              },
            },
          },
        },
      });
    };

    createChart();

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [chartUsed]);

  return <canvas id="financialChart"></canvas>;
};
