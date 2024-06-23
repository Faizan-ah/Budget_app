import React, { ChangeEvent, useEffect, useState } from "react";

import GetInput from "./GetInput";
import { handleOnlyNumberChange } from "../../utility/utilityMethods";
import { UserInputDataType } from "../../types/types";
import { formatDate } from "../../utility/dateUtility";

const Income = (props: {
  data: UserInputDataType[];
  isSubmit: boolean;
  setData: React.Dispatch<React.SetStateAction<UserInputDataType[]>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  modalType: string;
}) => {
  const { data, isSubmit, setData, setIsSubmit, toggle, modalType } = props;
  const [incomeOrExpense, setIncomeOrExpense] = useState<string>("");
  const [incomeOrExpenseSource, setIncomeOrExpenseSource] =
    useState<string>("");
  const [incomeOrExpenseDate, setIncomeOrExpenseDate] = useState<Date>(
    new Date()
  );
  const [isIncomeOrExpenseValid, setIsIncomeOrExpenseValid] =
    useState<boolean>(true);
  const [isIncomeOrExpenseSourceValid, setIsIncomeOrExpenseSourceValid] =
    useState<boolean>(true);
  const [isIncomeOrExpenseDateValid, setIsIncomeOrExpenseDateValid] =
    useState<boolean>(true);

  const validate = (): boolean => {
    if (!incomeOrExpense.trim()) {
      setIsIncomeOrExpenseValid(false);
      setIsSubmit(false);
      return false;
    }
    if (!incomeOrExpenseSource.trim()) {
      setIsIncomeOrExpenseSourceValid(false);
      setIsSubmit(false);
      return false;
    }
    if (incomeOrExpenseDate.toString() === "Invalid Date") {
      setIsIncomeOrExpenseDateValid(false);
      setIsSubmit(false);
      return false;
    }
    return true;
  };

  const resetStatesAndToggle = (): void => {
    setIncomeOrExpense("");
    setIncomeOrExpenseDate(new Date());
    setIncomeOrExpenseSource("");
    setIsIncomeOrExpenseValid(true);
    setIsIncomeOrExpenseDateValid(true);
    setIsIncomeOrExpenseSourceValid(true);
    setIsSubmit(false);
    toggle();
  };

  useEffect(() => {
    if (isSubmit) {
      if (validate()) {
        setData([
          ...data,
          {
            value: modalType.includes("Expense")
              ? String(-Math.abs(Number(incomeOrExpense)))
              : String(incomeOrExpense),
            source: incomeOrExpenseSource,
            date: formatDate(incomeOrExpenseDate),
            timestamp: Date.now(),
            id: crypto.randomUUID(),
            type: modalType,
          },
        ]);
        resetStatesAndToggle();
      }
    }
  }, [isSubmit, incomeOrExpense, incomeOrExpenseSource, incomeOrExpenseDate]);
  return (
    <React.Fragment>
      <GetInput
        text={modalType}
        forInput={`${modalType}-input`}
        id={`${modalType}-input`}
        placeholder={`Enter your ${modalType}..`}
        type="text"
        value={incomeOrExpense}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnlyNumberChange(
            e,
            setIncomeOrExpense,
            setIsIncomeOrExpenseValid
          )
        }
      />
      {!isIncomeOrExpenseValid && (
        <div className="text-danger mx-3">Enter valid {modalType}</div>
      )}
      <GetInput
        text={`${modalType} Source`}
        forInput={`${modalType}-source`}
        id={`${modalType}-source`}
        placeholder={`Enter your ${modalType} source..`}
        type="text"
        value={incomeOrExpenseSource}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIncomeOrExpenseSource(e.target.value)
        }
      />
      {!isIncomeOrExpenseSourceValid && (
        <div className="text-danger mx-3">Enter {modalType} source</div>
      )}
      <GetInput
        text="Date"
        forInput={`${modalType}-date`}
        id={`${modalType}-date`}
        placeholder="Enter date.."
        type="date"
        value={incomeOrExpenseDate}
        onChange={(e) => setIncomeOrExpenseDate(new Date(e.target.value))}
      />
      {!isIncomeOrExpenseDateValid && (
        <div className="text-danger mx-3">Enter valid date</div>
      )}
    </React.Fragment>
  );
};

export default Income;
