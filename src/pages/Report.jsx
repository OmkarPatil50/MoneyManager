import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, fetchIncome, fetchSavings } from "../actions";
import "./pages.css";

export const Report = () => {
  const { income, expenses } = useSelector((state) => state);

  const [reportType, setReportType] = useState("");

  const [showReport, setShowReport] = useState(false);

  const [report, setReport] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    expensesBreakdown: {},
    emptyReportTag: ""
  });

  const dispatch = useDispatch();

  const generateReport = () => {
    setShowReport(true);
    if (reportType === "incomeVsExpenses") {
      const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
      const totalExpenses = expenses.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      const savings = parseFloat(totalIncome) - parseFloat(totalExpenses);

      if (totalIncome === 0) {
        setReport({
          totalIncome,
          totalExpenses,
          savings,
          expensesBreakdown: {},
          emptyReportTag: "No Income Entries found"
        });
      } else {
        setReport({
          totalIncome,
          totalExpenses,
          savings,
          expensesBreakdown: {},
          emptyReportTag: ""
        });
      }
    }
    if (reportType === "expenseBreakdown") {
      const data = expenses.reduce((acc, curr) => {
        const { category, amount } = curr;
        if (acc[category]) {
          acc[category] += amount;
        } else {
          acc[category] = amount;
        }
        return acc;
      }, {});

      if (Object.keys(data).length === 0) {
        setReport((oldReport) => ({
          ...oldReport,
          expensesBreakdown: data,
          emptyReportTag: "No Expenses Entries found"
        }));
      } else {
        setReport((oldReport) => ({
          ...oldReport,
          expensesBreakdown: data,
          emptyReportTag: ""
        }));
      }
    }
  };

  const calculateTotal = (list) =>
    list.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpenses());
    dispatch(fetchSavings());
  }, [dispatch]);

  return (
    <div className="main-page">
      <header className="report-page-header">
        {" "}
        <h1 className="page-heading">Financial Reports</h1>
        <fieldset>
          <legend>Select Report Type:</legend>
          <select
            value={reportType}
            className="report-name-select"
            onChange={(e) => {
              setShowReport(false);
              setReportType(e.target.value);
            }}
          >
            <option value="">Select a report type</option>
            <option value="incomeVsExpenses">Income vs. Expenses</option>
            <option value="expenseBreakdown">Expense Breakdown</option>
          </select>
        </fieldset>
        <button className="btn-add-new-entry" onClick={generateReport}>
          Generate Report
        </button>
      </header>
      {report.totalIncome > 0 &&
      reportType === "incomeVsExpenses" &&
      showReport ? (
        <div className="report-page">
          <div className="report">
            <header className="report-header">
              <h3>income Vs Expenses Report</h3>
              <button
                className="btn-delete-entry close-modal-btn"
                onClick={() => {
                  setShowReport(false);
                  setReportType("");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </header>
            <table>
              <tr>
                <th>Total Income</th>
                <th>Total Expenses:</th>
                <th>Savings</th>
              </tr>
              <tr>
                <td> ${report.totalIncome}</td>
                <td> ${report.totalExpenses}</td>
                <td> ${report.savings}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : report.emptyReportTag.length && showReport ? (
        <p>{report.emptyReportTag}</p>
      ) : (
        ""
      )}
      {Object.keys(report.expensesBreakdown).length > 0 &&
      reportType === "expenseBreakdown" &&
      showReport ? (
        <div className="report-page">
          <div className="report">
            <header className="report-header">
              <h4>Expense Breakdown:</h4>
              <button
                className="btn-delete-entry close-modal-btn"
                onClick={() => {
                  setShowReport(false);
                  setReportType("");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </header>
            <table>
              <tr>
                <th>Category</th>
                <th>Total Expenses</th>
              </tr>
              {Object.keys(report?.expensesBreakdown)?.map(
                (category, index) => (
                  <tr key={index}>
                    <td>{category.toUpperCase()}</td>
                    <td>${report.expensesBreakdown[category]}</td>
                  </tr>
                )
              )}
            </table>
            <p>Total Expenses: ${calculateTotal(expenses)}</p>
          </div>
        </div>
      ) : report.emptyReportTag.length && showReport ? (
        <p>{report.emptyReportTag}</p>
      ) : (
        ""
      )}
    </div>
  );
};
