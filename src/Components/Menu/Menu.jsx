import { React, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Expense } from "../Expense/Expense";
import { Income } from "../Income/Income";
import { History } from "../History/History";

export const Menu = (props) => {
  const [expense, setExpense] = useState([]);

  const handleMenu = (menu) => {
    if (menu == "dashboard") {
      props.menuselected(<Dashboard />);
    } else if (menu == "transaction") {
      props.menuselected(<History />);
    } else if (menu == "income") {
      props.menuselected(<Income />);
    } else if (menu == "expense") {
      props.menuselected(<Expense setExpense={setExpense} />);
    } 
  };
  return (
    <nav className="p-3 flex w-auto border-2 ml-5 mr-5 mt-5">
      <a href="#" id="brand" className="flex gap-2">
        <img src="https://lh3.googleusercontent.com/ZRbzormInrqWNrjKjb21Rolv41Pm7psNuEOdkceeTRhZZljB-Lxgx6d3QA9oe1V-Kwus=w280" alt="image-loading" className="object-cover max-w-14 max-h-14" />
        <span className="text-lg font-mono pt-2">Budget</span>
      </a>
       <div className="container flex justify-around items-center">
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-200 transition cursor-pointer"
            onClick={() => handleMenu("dashboard")}
          >
            <span className="mr-4 w-6">
              <img src="/icons/dashboard.gif" alt="My Icon" />
            </span>
            Dashboard
          </li>
            <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-200 transition cursor-pointer"
            onClick={() => handleMenu("transaction")}
          >
            <span className="mr-4 w-6">
              <img src="/icons/transaction.gif" alt="My Icon" />
            </span>
            Transaction
          </li>
        
      
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-200 transition cursor-pointer"
            onClick={() => handleMenu("income")}
          >
            <span className="mr-4 w-6">
              <img src="/icons/income.gif" alt="My Icon" />
            </span>
            Income
          </li>
    

  
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-200 transition cursor-pointer"
            onClick={() => handleMenu("expense")}
          >
            <span className="mr-4 w-6">
              <img src="/icons/expense.gif" alt="My Icon" />
            </span>
            Expenses
          </li>
       
       </div>
    </nav>
  );
};
