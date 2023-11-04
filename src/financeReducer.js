const initialState = {
  income: [],
  expenses: [],
  savings: [],
  incomeCategories: [],
  expensesCategories: [],
  savingsCategories: [],
  loading: false,
  error: null
};
const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_LOADING": {
      return { ...state, loading: true };
    }

    case "FETCH_INCOME_SUCCESS": {
      return { ...state, income: action.payload, loading: false, error: null };
    }

    case "FETCH_INCOME_CATEGORIES_SUCCESS": {
      return {
        ...state,
        incomeCategories: action.payload.reduce((acc, curr) => {
          return acc.some((item) => item === curr.category)
            ? acc
            : [...acc, curr.category];
        }, []),
        loading: false,
        error: null
      };
    }

    case "FETCH_EXPENSES_SUCCESS": {
      return {
        ...state,
        loading: false,
        expenses: action.payload,
        error: null
      };
    }

    case "FETCH_EXPENSES_CATEGORIES_SUCCESS": {
      return {
        ...state,
        expensesCategories: action.payload.reduce((acc, curr) => {
          return acc.some((item) => item === curr.category)
            ? acc
            : [...acc, curr.category];
        }, []),
        loading: false,
        error: null
      };
    }

    case "FETCH_SAVINGS_SUCCESS": {
      return { ...state, loading: false, savings: action.payload, error: null };
    }

    case "FETCH_SAVINGS_CATEGORIES_SUCCESS": {
      return {
        ...state,
        savingsCategories: action.payload.reduce((acc, curr) => {
          return acc.some((item) => item === curr.category)
            ? acc
            : [...acc, curr.category];
        }, []),
        loading: false,
        error: null
      };
    }

    case "FETCH_ENTRY_FAILURE": {
      return { ...state, loading: false, error: "Error Adding new entry" };
    }

    case "FETCH_INCOME_FAILURE": {
      return { ...state, loading: false, error: "Error Fetching income data" };
    }

    case "FETCH_EXPENSES_FAILURE": {
      return {
        ...state,
        loading: false,
        error: "Error fetching expenses data"
      };
    }

    case "FETCH_SAVINGS_FAILURE": {
      return {
        ...state,
        loading: false,
        error: "Error fetching savings data"
      };
    }

    case "ADD_ENTRY_FAILURE": {
      return { ...state, loading: false, error: "Failed to add entry" };
    }
    case "DELETE_ENTRY_FAILURE": {
      return { ...state, loading: false, error: "Failed to delete entry" };
    }

    case "ADD_INCOME_SUCCESS": {
      return {
        ...state,
        loading: false,
        income: [...state.income, action.payload],
        error: null
      };
    }

    case "ADD_EXPENSE_SUCCESS": {
      return {
        ...state,
        loading: false,
        expenses: [...state.expenses, action.payload],
        error: null
      };
    }
    case "ADD_SAVINGS_SUCCESS": {
      return {
        ...state,
        loading: false,
        savings: [...state.savings, action.payload],
        error: null
      };
    }

    default:
      return state;
  }
};

export default financeReducer;
