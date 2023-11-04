import toast from "react-hot-toast";

export const fetchIncome = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/income"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};

export const fetchIncomeCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/income"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_INCOME_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};

export const sortIncome = (sortType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/income/sort/amount/${sortType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
    toast.success("Income Entries Sorted Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};

export const fetchExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/expenses"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_EXPENSES_FAILURE" });
  }
};

export const fetchExpensesCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/expenses"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_EXPENSES_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_EXPENSES_FAILURE" });
  }
};

export const sortExpense = (sortType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/expenses/sort/amount/${sortType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
    toast.success("Expenses Entries Sorted Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_EXPENSES_FAILURE" });
  }
};

export const fetchSavings = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/savings"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_SAVINGS_FAILURE" });
  }
};

export const fetchSavingsCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      "https://finance-management-apis.omkarpatil20.repl.co/savings"
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SAVINGS_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_SAVINGS_FAILURE" });
  }
};

export const sortSavings = (sortType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/savings/sort/amount/${sortType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
    toast.success("Savings Entries Sorted Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_SAVINGS_FAILURE" });
  }
};

export const addEntry = (entryObj) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/add-${entryObj.type}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(entryObj)
      }
    );

    const data = await response.json();
    if (entryObj.type === "income") {
      dispatch({ type: "ADD_INCOME_SUCCESS", payload: data.data });
    } else if (entryObj.type === "expense") {
      dispatch({ type: "ADD_EXPENSE_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "ADD_SAVINGS_SUCCESS", payload: data.data });
    }

    toast.success(`${entryObj.type.toUpperCase()} Entry Added Successfully!`);
  } catch (error) {
    toast.error({ error });
    console.log("Error in addition of entry: ", error);
    dispatch({ type: "ADD_ENTRY_FAILURE" });
  }
};

export const deleteEntry = (entryObj) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/delete-${entryObj.type}/${entryObj.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }
    );

    const data = await response.json();
    if (entryObj.type === "income") {
      dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
    } else if (entryObj.type === "expense") {
      dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
    } else {
      dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
    }
    toast.success(`${entryObj.type.toUpperCase()} Entry Deleted Successfully!`);
  } catch (error) {
    toast.error({ error });
    console.log("Error in deletion of entry: ", error);
    dispatch({ type: "DELETE_ENTRY_FAILURE" });
  }
};

export const filterIncome = (filterType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/income/filter/${filterType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
    toast.success("Income Entries Filtered Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};

export const filterExpenses = (filterType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/expenses/filter/${filterType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
    toast.success("Expenses Entries Filtered Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_EXPENSES_FAILURE" });
  }
};

export const filterSavings = (filterType) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch(
      `https://finance-management-apis.omkarpatil20.repl.co/savings/filter/${filterType}`
    );
    const data = await response.json();
    dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
    toast.success("Savings Entries Filtered Successfully!");
  } catch (error) {
    toast.error({ error });
    console.log("error fetching data: ", error);
    dispatch({ type: "FETCH_SAVINGS_FAILURE" });
  }
};
