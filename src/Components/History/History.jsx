import React from "react";
import cookie from "react-cookies";
import { Card } from "../Card/Card";
export const History = () => {
  const fetchIncome = cookie.load("incomes");
  const fetchExpense = cookie.load("expenses");
  const recentTransactions =
    fetchIncome && fetchExpense ? [...fetchIncome, ...fetchExpense] : [];

  const sortedData = recentTransactions.sort(
    (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
  );

  console.log(sortedData);

  return (
    <div>
      <h2 className="text-3xl font-mono text-center">Transactions</h2>
      {sortedData.slice(0, 3).map((transaction) => {
        const selectedDate = new Date(transaction.selectedDate);
        return (
          <Card className="mt-4 overflow-x-auto">
            <div className="flex">
              <div className="w-1/5 ">
                {transaction.type == "expense" ? (
                  <img src="/expenses.png" alt="Expense Icon" className="max-w-14 max-h-14"/>
                ) : (
                  <img src="/income.png" alt="Income Icon" className="max-w-14 max-h-14"/>
                )}
              </div>
              <div className="w-3/5 flex flex-col ">
                <div className="text-2xl">{transaction.title}</div>
                <div className="flex gap-4">
                  <div
                    className={`${
                      transaction.type == "income"
                        ? "text-lime-500"
                        : "text-red-800"
                    } text-2xl font-medium`}
                  >
                    Rs.{transaction.amount}
                  </div>
                  <div>{selectedDate.toLocaleString()}</div>
                  <div>{transaction.description}</div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
