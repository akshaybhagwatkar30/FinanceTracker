import React, { useContext, useEffect, useState, useRef } from "react";
import { Card } from "../Card/Card";
import { Transaction } from "../Transaction/Transaction";
import cookie from "react-cookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Income.css";
export const Income = (props) => {
  const fetchCUrrency = cookie.load("expense_currency");
  const fetchIncome = cookie.load("incomes");
  const inputDate = useRef(new Date());
  const [totalIncome, setTotalIncome] = useState(0);
  const [startDate, setStartDate] = useState();
  const [income, setIncome] = useState(fetchIncome ? fetchIncome : []);
  const [formData, setFormData] = useState();

  const deleteIncome = (incomeID) => {
    const newIncome = income.filter((eachIncome) => eachIncome.id != incomeID);
    setIncome(newIncome);
  };
  const handleIncomeChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddIncome = (e) => {
    e.preventDefault();
    const now = new Date();

    const newIncome = {
      ...formData,
      selectedDate: startDate,
      type: "income",
      id: Date.now() + Math.floor(Math.random() * 1000), 
      createdTime: `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}`,
    };

    setIncome((prevIncome) => {
      return [...prevIncome, newIncome];
    });
  };
  const handleDateChange = (date, type) => {
    setStartDate(date);
  };
  useEffect(() => {
    let fullIncome = 0;
    income.map((newIncome) => {
      fullIncome += parseInt(newIncome.amount);
    });
    setTotalIncome(fullIncome);
    cookie.save("incomes", JSON.stringify(income));
  }, [income]);
  return (
    <div>
      <h2 className="text-3xl font-mono text-left">Income</h2>
      <Card className="text-center">
        <h2 className="text-3xl text-black-800">
          Total Income:
          <span className="text-4xl font-bold">
            {totalIncome === 0 ? (
              <span className="">
                {" "}
                {fetchCUrrency ? fetchCUrrency.currency : ""}
                {" " + totalIncome}
              </span>
            ) : totalIncome > 0 ? (
              <span className=" text-lime-500">
                {" "}
                {fetchCUrrency ? fetchCUrrency.currency : ""}
                {" " + totalIncome}
              </span>
            ) : totalIncome < 0 ? (
              <span className=" text-red-500">
                {" "}
                {fetchCUrrency ? fetchCUrrency.currency : ""}
                {" " + totalIncome}
              </span>
            ) : (
              ""
            )}
          </span>
        </h2>
      </Card>
      <div className="flex gap-4 columns-2 mt-10">
        <Card className="w-3/12">
          <div className=" bg-transparent ">
            <form className="addIncome" onSubmit={handleAddIncome}>
              <h3 className="text-3xl text-center mb-5">Add Income</h3>
              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                name="amount"
                placeholder="Amount"
                step="0.01"
                onChange={handleIncomeChange}
                required
              />
              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="title"
                placeholder="Category"
                onChange={handleIncomeChange}
                required
              />
              <textarea
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Description"
                name="description"
                onChange={handleIncomeChange}
                required
              ></textarea>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, "date")}
                placeholderText="Date"
                showTimeSelect
                name="date"
                dateFormat="MMMM d, yyyy"
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </Card>
        <Card className="w-9/12 text-center">
          {income.length > 0
            ? income.map((transaction) => {
                return (
                  <Card className="mb-3 bg-white" key={transaction.id}>
                    <Transaction
                      type="income"
                      income={transaction}
                      deleteIncome={deleteIncome}
                    />
                  </Card>
                );
              })
            : "No Transaction Found!"}
        </Card>
      </div>
    </div>
  );
};
