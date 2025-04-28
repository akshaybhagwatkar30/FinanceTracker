import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { Transaction } from "../Transaction/Transaction";
import cookie from "react-cookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Expense = (props) => {
  const fetchCUrrency = cookie.load("expense_currency");
  const fetchExpense = cookie.load("expenses");
  const [startDate, setStartDate] = useState();
  const [totalExpense, setTotalExpense] = useState(0);
  const [expense, setExpense] = useState(fetchExpense ? fetchExpense : []);
  const [formData, setFormData] = useState();

  useEffect(() => {
    let fullExpense = 0;
    expense.map((newExpense) => {
      fullExpense += parseInt(newExpense.amount);
    });
    setTotalExpense(fullExpense);
    cookie.save("expenses", JSON.stringify(expense));
  }, [expense]);

  const deleteExpense = (expenseID) => {
    const newExpense = expense.filter(
      (eachExpense) => eachExpense.id !== expenseID
    );
    setExpense(newExpense);
  };

  const handleExpenseChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const now = new Date();
    const newExpense = {
      ...formData,
      selectedDate: startDate,
      type: "expense",
      id: Date.now() + Math.floor(Math.random() * 1000),
      createdTime: `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`, 
    };

    setExpense((prevExpense) => {
      return [...prevExpense, newExpense];
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-mono text-left">Expense</h2>
      <Card className="text-center">
        <h2 className="text-3xl text-black-800">
          Total Expenses: 
          <span className="text-4xl font-bold">
            {totalExpense === 0 ? (
              <span>
                {fetchCUrrency ? fetchCUrrency.currency : ""} {totalExpense}
              </span>
            ) : (
              <span className="text-red-700">
                {fetchCUrrency ? fetchCUrrency.currency : ""} {totalExpense}
              </span>
            )}
          </span>
        </h2>
      </Card>
      <div className="flex gap-4 columns-2 mt-10 w-full">
        <Card className="w-3/12">
          <div className="bg-transparent">
            <form className="addIncome" onSubmit={handleAddExpense}>
              <input type="hidden" name="type" value="expense" />
              <h3 className="text-3xl text-center mb-5">Add Expenses</h3>
              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                name="amount"
                placeholder="Amount"
                step="0.01"
                onChange={handleExpenseChange}
                required
              />
              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="title"
                placeholder="Category"
                onChange={handleExpenseChange}
                required
              />
              <textarea
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Description"
                name="description"
                onChange={handleExpenseChange}
                required
              ></textarea>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                placeholderText="Date"
                showTimeSelect
                dateFormat="MMMM d, yyyy"
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="w-full bg-red-800 text-white font-medium py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </Card>

        <Card className="w-9/12 text-center">
          {expense.length > 0 ? (
            expense.map((transaction) => (
              <Card className="mb-3 bg-white" key={transaction.id}>
                <Transaction
                  expense={transaction}
                  type="expense"
                  deleteExpense={deleteExpense}
                />
              </Card>
            ))
          ) : (
            "No Transaction Found!"
          )}
        </Card>
      </div>
    </div>
  );
};
