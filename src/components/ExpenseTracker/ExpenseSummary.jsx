import React from "react";

const ExpenseSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="expense-summary">
      <h3>Monthly Summary</h3>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      {/* Add charts or category breakdowns here */}
    </div>
  );
};

export default ExpenseSummary;
