import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEntry,
  fetchIncome,
  fetchIncomeCategories,
  filterIncome,
  sortIncome
} from "../actions";
import { Savings } from "./Savings";

export const Income = () => {
  const dispatch = useDispatch();
  const { income, incomeCategories } = useSelector((state) => state);

  const [category, setCategory] = useState("");

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchIncomeCategories());
  }, [dispatch]);

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US");
  };

  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Income Page</h1>
        <p className="total-tag">
          {" "}
          <span>Total Income: </span>${totalIncome}
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
                  dispatch(sortIncome("asc"));
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
                  dispatch(sortIncome("desc"));
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
              {incomeCategories.map((item) => {
                return <option>{item.toUpperCase()}</option>;
              })}
            </select>
            <div className="section-btn-filters">
              <button
                className="btn-filter-apply"
                onClick={() => {
                  if (category === "") {
                    dispatch(fetchIncome());
                  } else {
                    dispatch(filterIncome(category));
                  }
                }}
              >
                Apply
              </button>
              <button
                className="btn-filter-apply"
                onClick={() => {
                  dispatch(fetchIncome());
                }}
              >
                Clear
              </button>
            </div>
          </fieldset>
        </section>
      </header>
      {income.length ? (
        <ul className="entries-list">
          {income.map((transaction, index) => {
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
                        deleteEntry({ type: "income", id: transaction._id })
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
          "Let's make it rain! Add your first income entry and watch your
          financial journey take off!"
        </p>
      )}
    </div>
  );
};
