import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { ChangeEvent, useEffect, useState } from "react";

import LabelComponent from "../components/Label";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import {
  calculateTotalIncome,
  handleOnlyNumberChange,
} from "../utility/utilityMethods";
import { formatDate, formatDateForInputValue } from "../utility/dateUtility";
import GetInput from "../components/BudgetApp/GetInput";
import InputModal from "../components/BudgetApp/Modal";
import { IncomeData } from "../types/types";
import { Table } from "reactstrap";
import InputTable from "../components/BudgetApp/InputTable";

const BudgetApp = () => {
  const navigate = useNavigate();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const incomeModalToggle = () => {
    setIsIncomeModalOpen(!isIncomeModalOpen);
  };
  const [income, setIncome] = useState<Array<IncomeData>>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const incomeTitleArray = ["Date", "Income", "Income Source"];

  useEffect(() => {
    setTotalIncome(calculateTotalIncome(income));
  }, [totalIncome, income]);
  return (
    <div>
      <h1>Budget App</h1>
      <ButtonComponent
        text="Add Income"
        onClick={() => setIsIncomeModalOpen(!isIncomeModalOpen)}
      />
      <ButtonComponent
        onClick={() => navigate(routes.overview)}
        color="secondary"
        text="To overview"
      />
      <InputModal
        toggle={incomeModalToggle}
        modalTitle="Add Income"
        isModalOpen={isIncomeModalOpen}
        id="income"
        setData={setIncome}
        data={income}
      />

      <InputTable
        titleArray={incomeTitleArray}
        data={income}
        totalIncome={totalIncome}
      />
    </div>
  );
};

export default BudgetApp;
