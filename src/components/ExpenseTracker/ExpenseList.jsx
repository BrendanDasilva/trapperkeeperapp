import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, updateExpense, deleteExpense }) => {
  return (
    <div className="expense-list-container">
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            updateExpense={updateExpense}
            deleteExpense={deleteExpense}
          />
        ))
      ) : (
        <p className="no-expenses-message">No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default ExpenseList;
