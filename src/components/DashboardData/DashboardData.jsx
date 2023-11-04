import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardData.css";
import { fetchExpenses, fetchIncome, fetchSavings } from "../../actions";
import { Savings } from "../../pages/Savings";

export const DashboardData = () => {
  const { income, expenses, savings } = useSelector((state) => state);

  const dispatch = useDispatch();

  const calculateTotal = (list) =>
    list.reduce((acc, curr) => acc + curr.amount, 0);

  const amountInHand =
    parseFloat(calculateTotal(income)) -
    parseFloat(calculateTotal(expenses)) -
    parseFloat(calculateTotal(savings));

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpenses());
    dispatch(fetchSavings());
  }, [dispatch]);

  return (
    <div className="dashboard-data-box">
      <h2>
        {" "}
        <i className="fa-solid fa-hand-holding-dollar"></i> Total Income: $
        {calculateTotal(income) || 0}
      </h2>
      <h2>
        {" "}
        <i className="fa-solid fa-credit-card"></i> Total Expenditure: $
        {calculateTotal(expenses) || 0}
      </h2>
      <h2>
        {" "}
        <i className="fa-solid fa-piggy-bank"></i> Total Savings: $
        {calculateTotal(savings) || 0}
      </h2>
      <h2>
        {" "}
        <i className="fa-solid fa-sack-dollar"></i> Amount in Hand: $
        {amountInHand || 0}
      </h2>
    </div>
  );
};
