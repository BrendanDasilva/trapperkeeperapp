import React from "react";

const ExpenseItem = ({ expense, updateExpense, deleteExpense }) => {
  return (
    <div className="expense-item">
      <h3>{expense.description}</h3>
      <p>Amount: ${expense.amount.toFixed(2)}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
      <div className="expense-actions">
        <button
          className="expense-item-button"
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>
        {/* Optional: Add an edit button if you want to implement editing */}
      </div>
    </div>
  );
};

export default ExpenseItem;
