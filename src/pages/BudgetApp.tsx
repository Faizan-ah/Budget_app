import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { routes } from "../routes/Routes";
import ButtonComponent from "../components/Button";
import { calculateTotal } from "../utility/utilityMethods";
import InputModal from "../components/BudgetApp/Modal";
import { UserInputDataType } from "../types/types";
import InputTable from "../components/BudgetApp/InputTable";

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

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const incomeTitleArray = ["Date", "Amount", "Source"];

  useEffect(() => {
    setTotalIncome(calculateTotal(income));
    setTotalExpense(calculateTotal(expense));
    setTotalBalance(calculateTotal(data));
  }, [totalIncome, income, totalExpense, expense]);

  useEffect(() => {
    const mergedData = [...income, ...expense].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    setData(mergedData);
  }, [income, expense]);

  return (
    <div>
      <h1>Budget App</h1>
      <ButtonComponent text="Add Income" onClick={incomeModalToggle} />
      <ButtonComponent text="Add Expense" onClick={expenseModalToggle} />
      <ButtonComponent
        onClick={() => navigate(routes.overview)}
        color="secondary"
        text="To overview"
      />
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
