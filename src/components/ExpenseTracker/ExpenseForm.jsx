import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description,
      amount: parseFloat(amount),
      category,
      date,
    };
    addExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <form className="expense-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="expense-form-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        className="expense-form-input"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        className="expense-form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        className="expense-form-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button className="expense-form-button" type="submit">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
