import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntry,
  fetchExpensesCategories,
  fetchIncomeCategories,
  fetchSavingsCategories
} from "../actions";
import toast from "react-hot-toast";

export const IncomeExpenseForm = () => {
  const {
    income,
    expenses,
    savings,
    incomeCategories,
    expensesCategories,
    savingsCategories
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [entryType, setEntryType] = useState("income");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showCategoryAdded, setShowCategoryAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchIncomeCategories());
    dispatch(fetchExpensesCategories());
    dispatch(fetchSavingsCategories());
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(
      addEntry({
        type: entryType,
        amount: parseFloat(amount),
        description,
        category: category.toLowerCase()
      })
    );
    setAmount(0);
    setDescription("");
    setEntryType("income");
    setCategory("");
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">Add New Entry</h1>
      <section className="new-entry-form">
        <form>
          <div className="report-page-header">
            <fieldset>
              <legend>Select Entry Type</legend>
              <select
                name="entry"
                required
                className="report-name-select"
                onChange={(event) => setEntryType(event.target.value)}
                value={entryType}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="savings">Savings</option>
              </select>
            </fieldset>
            <fieldset>
              <legend>Select Category</legend>
              {!newCategory && !showNewCategoryInput ? (
                <>
                  {entryType === "income" ? (
                    <select
                      name="category"
                      className="report-name-select"
                      onChange={(event) => {
                        setCategory(event.target.value);
                        setShowNewCategoryInput(false);
                      }}
                    >
                      {incomeCategories.map((item) => {
                        return (
                          <option value={item}>{item.toUpperCase()}</option>
                        );
                      })}
                    </select>
                  ) : entryType === "expense" ? (
                    <select
                      name="category"
                      className="report-name-select"
                      onChange={(event) => {
                        setCategory(event.target.value);
                        setShowNewCategoryInput(false);
                      }}
                    >
                      {expensesCategories.map((item) => {
                        return (
                          <option value={item}>{item.toUpperCase()}</option>
                        );
                      })}
                    </select>
                  ) : (
                    <select
                      name="category"
                      className="report-name-select"
                      onChange={(event) => {
                        setCategory(event.target.value);
                        setShowNewCategoryInput(false);
                      }}
                    >
                      {savingsCategories.map((item) => {
                        return (
                          <option value={item}>{item.toUpperCase()}</option>
                        );
                      })}
                    </select>
                  )}
                  {!showNewCategoryInput ? (
                    <button
                      className="btn-filter-apply"
                      onClick={() => {
                        setShowNewCategoryInput(true);
                      }}
                    >
                      Add New Category
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : showCategoryAdded ? (
                <div className="section-new-category">
                  <p>{newCategory}</p>
                  <div>
                    <button
                      className="btn-new-category-entry"
                      onClick={() => {
                        setShowCategoryAdded(false);
                        setShowNewCategoryInput(true);
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-new-category-entry"
                      onClick={() => {
                        setCategory("");
                        setNewCategory("");
                        setShowNewCategoryInput(false);
                        setShowCategoryAdded(false);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              {showNewCategoryInput ? (
                <>
                  <label htmlFor="category">
                    <input
                      type="text"
                      required
                      value={newCategory}
                      onChange={(event) => {
                        setNewCategory(event.target.value);
                      }}
                    />
                  </label>
                  <div className="section-btn-filters">
                    <button
                      className="btn-filter-apply"
                      onClick={() => {
                        if (newCategory.length) {
                          setCategory(newCategory);
                          setShowNewCategoryInput(false);
                          setShowCategoryAdded(true);
                        } else {
                          toast.error("Category is Required");
                        }
                      }}
                    >
                      Add
                    </button>
                    <button
                      className="btn-filter-apply"
                      onClick={() => {
                        setCategory("");
                        setNewCategory("");
                        setShowNewCategoryInput(false);
                      }}
                    >
                      Discard
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </fieldset>
            <fieldset>
              <legend>Entry Description</legend>
              <label htmlFor="description">
                <input
                  type="text"
                  required
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Amount</legend>
              <label htmlFor="amount">
                <input
                  type="number"
                  required
                  onChange={(event) => setAmount(event.target.value)}
                  value={amount}
                />
              </label>
            </fieldset>
          </div>
          <button
            onClick={() => {
              if (description && amount && entryType) {
                handleClick(event);
                setCategory("");
                setNewCategory("");
                setShowNewCategoryInput(false);
              } else {
                toast.error("All Fields are required");
              }
            }}
            className="btn-add-new-entry"
          >
            Add Entry
          </button>
        </form>
      </section>
    </div>
  );
};
