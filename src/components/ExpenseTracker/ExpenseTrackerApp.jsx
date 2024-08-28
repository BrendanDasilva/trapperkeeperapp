import React, { useState } from "react";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

function ExpenseTrackerApp() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="expense-tracker-container">
        <div className="form-container">
          <h2 className="expense-title">Expense Tracker</h2>
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="expense-sections">
          <h3 className="current-expenses-title">Your Expenses</h3>
          <ExpenseList
            expenses={expenses}
            updateExpense={updateExpense}
            deleteExpense={deleteExpense}
          />
        </div>
        <div className="expense-sections">
          <ExpenseSummary expenses={expenses} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default ExpenseTrackerApp;
