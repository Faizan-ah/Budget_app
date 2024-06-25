import { useNavigate } from "react-router-dom";
import { mkConfig, generateCsv, download } from "export-to-csv";

import ButtonComponent from "../components/Button";
import { routes } from "../routes/Routes";
import { getDataFromLocalStorage } from "../store";
import { UserInputDataType } from "../types/types";
import Chart from "../components/Dashboard/Chart";

const Dashboard = () => {
  const navigate = useNavigate();
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const downloadCSV = () => {
    const income = getDataFromLocalStorage("Income-data") || [];
    const expense = getDataFromLocalStorage("Expense-data") || [];
    const mergedData = [...income, ...expense]
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((data: UserInputDataType) => {
        return { amount: data.amount, date: data.date, source: data.source };
      });
    const csv = generateCsv(csvConfig)(mergedData as []);
    download(csvConfig)(csv);
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
      <ButtonComponent
        text="Download Statement"
        color="success"
        onClick={downloadCSV}
      />
      <div className="d-flex justify-content-center">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
