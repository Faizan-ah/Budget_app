import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";

import { routes } from "../routes/Routes";
import ButtonComponent from "../components/Button";
import {
  calculateTotal,
  handleOnlyNumberChange,
} from "../utility/utilityMethods";
import InputModal from "../components/BudgetApp/Modal";
import { UserInputDataType } from "../types/types";
import SummaryTable from "../components/BudgetApp/SummaryTable";
import LabeledInput from "../components/LabeledInput";
import { displayErrorAlert } from "../utility/Alert";
import { ERR_ADD_TARGET, ERR_NOT_ENOUGH_BALANCE } from "../utility/Constants";

const BudgetApp = () => {
  const navigate = useNavigate();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState<boolean>(false);

  const [modalType, setModalType] = useState<string>("");
  const incomeModalToggle = () => {
    setModalType("Income");
    setIsIncomeModalOpen(!isIncomeModalOpen);
  };
  const expenseModalToggle = () => {
    setModalType("Expense");
    setIsExpenseModalOpen(!isExpenseModalOpen);
  };

  const transferModalToggle = () => {
    setModalType("Transfer");
    setIsTransferModalOpen(!isTransferModalOpen);
  };

  const [income, setIncome] = useState<Array<UserInputDataType>>([]);
  const [expense, setExpense] = useState<Array<UserInputDataType>>([]);
  const [data, setData] = useState<Array<UserInputDataType>>([]);
  const [tempTargetSaving, setTempTargetSaving] = useState<string>("");
  const [targetSaving, setTargetSaving] = useState<string>("");
  const [tempSaving, setTempSaving] = useState<number | string>("");
  // state for updating balance on click
  const [currentSaving, setCurrentSaving] = useState<number>(0);

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isTargetDisable, setIsTargetDisable] = useState<boolean>(false);
  const incomeTitleArray = ["Date", "Amount", "Source", "Action"];

  useEffect(() => {
    const totalInc = calculateTotal(income);
    const totalExp = calculateTotal(expense);
    const totalBal = calculateTotal(data) - Number(currentSaving);

    setTotalIncome(totalInc);
    setTotalExpense(totalExp);
    setTotalBalance(totalBal);

    if (data.length === 0) {
      setCurrentSaving(0);
    }
  }, [income, expense, data, currentSaving]);

  useEffect(() => {
    const mergedData = [...income, ...expense].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    setData(mergedData);
  }, [income, expense]);

  useEffect(() => {
    setProgress((Number(currentSaving) / Number(tempTargetSaving)) * 100);
  }, [currentSaving, tempTargetSaving]);
  return (
    <div>
      <ToastContainer />
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
        text="Transfer Funds"
        className="mx-1"
        onClick={transferModalToggle}
      />
      <ButtonComponent
        className="mx-1"
        onClick={() => navigate(routes.overview)}
        color="secondary"
        text="To overview"
      />
      <div className="d-flex w-50 align-items-center">
        <div className="w-75 d-flex row justify-content-center">
          <div className="d-flex align-items-center">
            <LabeledInput
              parentDivClass="m-2"
              text="Add your Target Saving"
              forInput="target-saving"
              id="target-saving"
              placeholder="Enter amount.."
              value={tempTargetSaving}
              type="text"
              disable={isTargetDisable}
              onChange={(e) => handleOnlyNumberChange(e, setTempTargetSaving)}
            />
            <ButtonComponent
              text={isTargetDisable ? "Reset Target" : "Save target"}
              style={{ marginTop: "30px" }}
              onClick={() => {
                if (!tempTargetSaving.trim()) {
                  displayErrorAlert(ERR_ADD_TARGET);
                  return;
                }
                setIsTargetDisable(!isTargetDisable);
                setTargetSaving(tempTargetSaving);
                if (isTargetDisable) {
                  setTempTargetSaving("");
                  setTargetSaving("");
                }
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <LabeledInput
              parentDivClass="m-2"
              text="Add to Saving Account"
              forInput="current-saving"
              id="current-saving"
              placeholder="Enter amount.."
              value={tempSaving}
              type="text"
              onChange={(e) => handleOnlyNumberChange(e, setTempSaving)}
            />
            <ButtonComponent
              text={"Add Saving"}
              style={{ marginTop: "30px" }}
              onClick={() => {
                if (Number(totalBalance) >= Number(tempSaving)) {
                  setCurrentSaving(Number(currentSaving) + Number(tempSaving));
                } else {
                  displayErrorAlert(ERR_NOT_ENOUGH_BALANCE);
                }
                setTempSaving("");
              }}
            />
          </div>
        </div>
        <div className="w-50 text-center d-flex flex-column align-items-center">
          <div className="w-h-100 mt-3">
            {targetSaving && (
              <CircularProgressbar
                value={
                  currentSaving
                    ? Number(progress.toFixed(0))
                    : Number(targetSaving)
                }
                text={` ${currentSaving ? progress.toFixed(0) : 0}% `}
              />
            )}
          </div>
          <h3 className="mt-2">Your Savings: {currentSaving}</h3>
        </div>
      </div>
      <InputModal
        toggle={
          modalType === "Income"
            ? incomeModalToggle
            : modalType === "Expense"
            ? expenseModalToggle
            : transferModalToggle
        }
        modalTitle={
          modalType === "Transfer" ? "Transfer Funds" : `Add ${modalType}`
        }
        isModalOpen={
          modalType === "Income"
            ? isIncomeModalOpen
            : modalType === "Expense"
            ? isExpenseModalOpen
            : isTransferModalOpen
        }
        id={modalType}
        setData={modalType === "Income" ? setIncome : setExpense}
        data={modalType === "Income" ? income : expense}
        totalBalance={totalBalance}
        setTotalBalance={setTotalBalance}
        currentSaving={currentSaving}
        setCurrentSaving={setCurrentSaving}
      />
      <SummaryTable
        titleArray={incomeTitleArray}
        mergedData={data}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        totalBalance={totalBalance}
        setMergedData={setData}
        setIncome={setIncome}
        setExpense={setExpense}
      />
    </div>
  );
};

export default BudgetApp;
