import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, fetchIncome, fetchSavings } from "../actions";
import { DashboardData } from "../components/DashboardData/DashboardData";
import { ReactComponent as Image } from "../Data/hero.svg";
import "./pages.css";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpenses());
    dispatch(fetchSavings());
  }, [dispatch]);

  return (
    <div className="main-page">
      <section className="dashboard-section">
        <Image className="hero-img" />
      </section>
      <section className="dashboard-data dashboard-section">
        <DashboardData />
      </section>
    </div>
  );
};
