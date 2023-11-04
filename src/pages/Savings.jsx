import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEntry,
  fetchSavings,
  fetchSavingsCategories,
  filterSavings,
  sortSavings
} from "../actions";
import "./pages.css";

export const Savings = () => {
  const dispatch = useDispatch();
  const { savings, savingsCategories } = useSelector((state) => state);

  const [category, setCategory] = useState("");

  const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US");
  };

  useEffect(() => {
    dispatch(fetchSavingsCategories());
    dispatch(fetchSavings());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header className="page-header">
        <h1 className="page-heading">Savings Page</h1>
        <p className="total-tag">
          {" "}
          <span>Total Savings: </span>${totalSavings}
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
                  dispatch(sortSavings("asc"));
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
                  dispatch(sortSavings("desc"));
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
              {savingsCategories.map((item) => {
                return <option>{item.toUpperCase()}</option>;
              })}
            </select>
            <div className="section-btn-filters">
              <button
                className="btn-filter-apply"
                onClick={() => {
                  if (category === "") {
                    dispatch(fetchSavings());
                  } else {
                    dispatch(filterSavings(category));
                  }
                }}
              >
                Apply
              </button>
              <button
                className="btn-filter-apply"
                onClick={() => {
                  dispatch(fetchSavings());
                }}
              >
                Clear
              </button>
            </div>
          </fieldset>
        </section>
      </header>
      {savings.length ? (
        <ul className="entries-list">
          {savings.map((transaction, index) => {
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
                        deleteEntry({ type: "saving", id: transaction._id })
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
          ""Get the savings party started! Begin by adding your first savings
          entry now!""
        </p>
      )}
    </div>
  );
};
