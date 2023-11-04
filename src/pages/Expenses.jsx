import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEntry,
  fetchExpenses,
  fetchExpensesCategories,
  filterExpenses,
  sortExpense
} from "../actions";
import "./pages.css";

export const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, expensesCategories } = useSelector((state) => state);

  const [category, setCategory] = useState("");

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US");
  };

  useEffect(() => {
    dispatch(fetchExpensesCategories());
    dispatch(fetchExpenses());
  }, [dispatch]);
  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Expenses Page</h1>
        <p className="total-tag">
          <span>Total Expenses:</span> ${totalExpenses}
        </p>
        <section className="filters-section">
          <fieldset>
            <legend>Sort By Amount</legend>
            <label htmlFor="asc">
              <input
                type="radio"
                name="sort"
                id="asc"
                onChange={() => {
                  dispatch(sortExpense("asc"));
                }}
              />{" "}
              Low to High
            </label>
            <label htmlFor="desc">
              <input
                type="radio"
                name="sort"
                id="desc"
                onChange={() => {
                  dispatch(sortExpense("desc"));
                }}
              />{" "}
              High to Low
            </label>
          </fieldset>
          <fieldset>
            <legend>Filter By Category</legend>
            <select
              name="filter"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All</option>
              {expensesCategories.map((item) => {
                return <option>{item.toUpperCase()}</option>;
              })}
            </select>
            <div className="section-btn-filters">
              <button
                className="btn-filter-apply"
                onClick={() => {
                  if (category === "") {
                    dispatch(fetchExpenses());
                  } else {
                    dispatch(filterExpenses(category));
                  }
                }}
              >
                Apply
              </button>
              <button
                className="btn-filter-apply"
                onClick={() => {
                  dispatch(fetchExpenses());
                }}
              >
                Clear
              </button>
            </div>
          </fieldset>
        </section>
      </header>
      {expenses.length ? (
        <ul className="entries-list">
          {expenses.map((transaction, index) => {
            return (
              <li key={index} className="entries-list-item">
                <header className="entries-list-item-header">
                  <h3>
                    {index + 1}. {transaction.description} : $
                    {transaction.amount}
                  </h3>
                  <button
                    className="btn-delete-entry"
                    onClick={() => {
                      dispatch(
                        deleteEntry({ type: "expense", id: transaction._id })
                      );
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </header>
                <p className="entry-details">
                  {getDate(transaction.createdAt)}
                </p>
                <p className="entry-details">
                  <strong>Category: </strong>
                  {transaction.category.toUpperCase()}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty-list-line">
          "Ready to manage your expenses? Start by adding your first expense
          now!"
        </p>
      )}
    </div>
  );
};
