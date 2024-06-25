import { useNavigate } from "react-router-dom";

import ButtonComponent from "../components/Button";
import { routes } from "../routes/Routes";
import { getDataFromLocalStorage } from "../store";
import Chart from "../components/Dashboard/Chart";

const Dashboard = () => {
  const navigate = useNavigate();

  const convertToCSV = (objArray: string[][]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = () => {
    const income = getDataFromLocalStorage("Income-data") || [];
    const expense = getDataFromLocalStorage("Expense-data") || [];
    const mergedData = [...income, ...expense].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const csvDataFormat: string[][] = [
      ["amount", "date", "source"],
      ...mergedData.map((data) => [data.amount, data.date, data.source]),
    ];

    const csvData = new Blob([convertToCSV(csvDataFormat)], {
      type: "text/csv",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `statement.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        onClick={downloadCSV}
        color="success"
        text="Download Statement"
      />

      <div className="d-flex justify-content-center">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
