import React, { useState } from "react";
import { Card } from "../Card/Card";
import { Charts } from "../Charts/Charts";
import { History } from "../History/History";
import cookie from "react-cookies";

export const Dashboard = () => {
  const [chartUsed, setChartUsed] = useState("line");

  const incomes = cookie.load("incomes") || [];
  const expenses = cookie.load("expenses") || [];

  const recentTransactions = [...incomes, ...expenses];

  const sortedData = recentTransactions.sort(
    (a, b) => new Date(b.selectedDate) - new Date(a.selectedDate)
  );

  console.log(sortedData);

  return (
    <div>
      <div className="flex gap-4">
        <Card className="w-3/5">
          <div className="flex justify-between w-full">
            <h2 className="text-3xl font-mono">Numbers</h2>
          </div>
          <Charts chartUsed={chartUsed} />
        </Card>

        <Card className="w-2/5">
          <History />
        </Card>
      </div>
    </div>
  );
};
