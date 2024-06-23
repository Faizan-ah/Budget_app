import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { routes } from "../routes/Routes";
import ButtonComponent from "../components/Button";
import {
  calculateTotal,
  handleOnlyNumberChange,
} from "../utility/utilityMethods";
import InputModal from "../components/BudgetApp/Modal";
import { UserInputDataType } from "../types/types";
import InputTable from "../components/BudgetApp/InputTable";
import GetInput from "../components/BudgetApp/GetInput";

const BudgetApp = () => {
  const navigate = useNavigate();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const incomeModalToggle = () => {
    setModalType("Income");
    setIsIncomeModalOpen(!isIncomeModalOpen);
  };
  const expenseModalToggle = () => {
    setModalType("Expense");
    setIsExpenseModalOpen(!isExpenseModalOpen);
  };

  const [income, setIncome] = useState<Array<UserInputDataType>>([]);
  const [expense, setExpense] = useState<Array<UserInputDataType>>([]);
  const [data, setData] = useState<Array<UserInputDataType>>([]);
  const [targetSaving, setTargetSaving] = useState<string>("");
  const [tempSaving, setTempSaving] = useState<string>("");
  // state for updating balance on click
  const [currentSaving, setCurrentSaving] = useState<string>("");

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const [isTargetDisable, setIsTargetDisable] = useState<boolean>(false);
  const [isSavingDisable, setIsSavingDisable] = useState<boolean>(false);
  const incomeTitleArray = ["Date", "Amount", "Source"];

  useEffect(() => {
    setTotalIncome(calculateTotal(income));
    setTotalExpense(calculateTotal(expense));
    setTotalBalance(calculateTotal(data) - Number(currentSaving));
  }, [totalIncome, income, totalExpense, expense, currentSaving]);

  useEffect(() => {
    const mergedData = [...income, ...expense].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    setData(mergedData);
  }, [income, expense]);

  return (
    <div>
      <h1>Budget App</h1>
      <ButtonComponent
        text="Add Income"
        className="mx-1"
        onClick={incomeModalToggle}
      />
      <ButtonComponent
        text="Add Expense"
        className="mx-1"
        onClick={expenseModalToggle}
      />
      <ButtonComponent
        className="mx-1"
        onClick={() => navigate(routes.overview)}
        color="secondary"
        text="To overview"
      />
      <div className="w-50 d-flex row justify-content-center">
        <div className="d-flex align-items-center">
          <GetInput
            text="Add your target saving"
            forInput="target-saving"
            id="target-saving"
            value={targetSaving}
            type="text"
            disable={isTargetDisable}
            onChange={(e) => handleOnlyNumberChange(e, setTargetSaving)}
          />
          <ButtonComponent
            text={isTargetDisable ? "Reset Target" : "Save target"}
            style={{ marginTop: "30px" }}
            onClick={() => {
              setIsTargetDisable(!isTargetDisable);
            }}
          />
        </div>
        <div className="d-flex align-items-center">
          <GetInput
            text="Add your current saving"
            forInput="current-saving"
            id="current-saving"
            value={tempSaving}
            type="text"
            onChange={(e) => handleOnlyNumberChange(e, setTempSaving)}
            disable={isSavingDisable}
          />
          <ButtonComponent
            text={isSavingDisable ? "Update savings" : "Add savings"}
            style={{ marginTop: "30px" }}
            onClick={() => {
              setCurrentSaving(tempSaving);
              setIsSavingDisable(!isSavingDisable);
            }}
          />
        </div>
      </div>

      <InputModal
        toggle={modalType === "Income" ? incomeModalToggle : expenseModalToggle}
        modalTitle={`Add ${modalType}`}
        isModalOpen={
          modalType === "Income" ? isIncomeModalOpen : isExpenseModalOpen
        }
        id={modalType}
        setData={modalType === "Income" ? setIncome : setExpense}
        data={modalType === "Income" ? income : expense}
      />
      <InputTable
        titleArray={incomeTitleArray}
        mergedData={data}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={totalBalance}
      />
    </div>
  );
};

export default BudgetApp;
