import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <section className="navbar-left">
        <h1 className="app-heading-navbar">
          <i className="fa-solid fa-wallet"></i> <span>Money</span>Manager
        </h1>
      </section>

      <button
        className="btn-add-new-entry"
        onClick={() => {
          navigate("/new");
        }}
      >
        Add New Entries
      </button>
      <section className="navbar-right">
        <NavLink activeclassname="active" className="link nav-items" to="/">
          Dashboard
        </NavLink>
        <NavLink
          activeclassname="active"
          className="link nav-items"
          to="/income"
        >
          Income
        </NavLink>
        <NavLink
          activeclassname="active"
          className="link nav-items"
          to="/expenses"
        >
          Expense
        </NavLink>
        <NavLink
          activeclassname="active"
          className="link nav-items"
          to="/savings"
        >
          Savings
        </NavLink>
        <NavLink
          activeclassname="active"
          className="link nav-items"
          to="/reports"
        >
          Reports
        </NavLink>
      </section>
    </nav>
  );
};
