import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import ButtonComponent from "../components/Button";
import { routes } from "../routes/Routes";
import { getDataFromLocalStorage } from "../store";
import Chart from "../components/Dashboard/Chart";

const Dashboard = () => {
  const navigate = useNavigate();

  const DownloadCSV = (): JSX.Element => {
    const income = getDataFromLocalStorage("Income-data") || [];
    const expense = getDataFromLocalStorage("Expense-data") || [];
    const mergedData = [...income, ...expense].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const csvData = [
      ["amount", "date", "source"],
      ...mergedData.map((data) => [data.amount, data.source, data.date]),
    ];

    return (
      <CSVLink data={csvData}>
        <ButtonComponent text="Download Statement" color="success" />
      </CSVLink>
    );
  };

  return (
    <div className="bg-light bg-gradient mx-auto p-3 h-100 w-sm-100 w-md-75 w-lg-50">
      <h1>Dashboard</h1>
      <ButtonComponent
        onClick={() => navigate(routes.budgetApp)}
        color="primary"
        className="me-2"
        text="Budget App"
      />
      <DownloadCSV />
      <div className="d-flex justify-content-center">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
