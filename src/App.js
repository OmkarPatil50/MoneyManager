import { useSelector } from "react-redux";
import { IncomeExpenseForm } from "./components/IncomeExpenseForm";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Income } from "./pages/Income";
import { Report } from "./pages/Report";
import { Savings } from "./pages/Savings";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Loader } from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { loading } = useSelector((state) => state);
  return (
    <div className="App">
      {loading ? <Loader /> : ""}

      <Navbar />
      <Routes>
        <Route path="/new" element={<IncomeExpenseForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />
      <p className="footer-tagline">
        Check Backend{" "}
        <a href="https://replit.com/@OmkarPatil20/Finance-Management-Apis">
          Here
        </a>{" "}
      </p>
    </div>
  );
}
