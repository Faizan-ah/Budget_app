import React, { ChangeEvent, useEffect, useState } from "react";

import GetInput from "./GetInput";
import { handleOnlyNumberChange } from "../../utility/utilityMethods";
import { IncomeData } from "../../types/types";
import { formatDate } from "../../utility/dateUtility";

const Income = (props: {
  data: IncomeData[];
  isSubmit: boolean;
  setData: React.Dispatch<React.SetStateAction<IncomeData[]>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}) => {
  const { data, isSubmit, setData, setIsSubmit, toggle } = props;
  const [income, setIncome] = useState<string>("");
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [incomeDate, setIncomeDate] = useState<Date>(new Date());
  const [isIncomeValid, setIsIncomeValid] = useState<boolean>(true);
  const [isIncomeSourceValid, setIsIncomeSourceValid] = useState<boolean>(true);
  const [isIncomeDateValid, setIsIncomeDateValid] = useState<boolean>(true);

  const validate = (): boolean => {
    if (!income.trim()) {
      setIsIncomeValid(false);
      setIsSubmit(false);
      return false;
    }
    if (!incomeSource.trim()) {
      setIsIncomeSourceValid(false);
      setIsSubmit(false);
      return false;
    }
    if (incomeDate.toString() === "Invalid Date") {
      setIsIncomeDateValid(false);
      setIsSubmit(false);
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (isSubmit) {
      if (validate()) {
        setData([
          ...data,
          { income, source: incomeSource, date: formatDate(incomeDate) },
        ]);
        setIncome("");
        setIncomeDate(new Date());
        setIncomeSource("");
        setIsIncomeValid(true);
        setIsIncomeDateValid(true);
        setIsIncomeSourceValid(true);
        setIsSubmit(false);
        toggle();
      }
    }
  }, [isSubmit, income, incomeSource, incomeDate]);
  return (
    <React.Fragment>
      <GetInput
        text="Income"
        forInput="income-input"
        id="income-input"
        placeholder="Enter your income.."
        type="text"
        value={income}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnlyNumberChange(e, setIncome, isIncomeValid, setIsIncomeValid)
        }
      />
      {!isIncomeValid && (
        <div className="text-danger mx-3">Enter valid income</div>
      )}
      <GetInput
        text="Income Source"
        forInput="income-source"
        id="income-source"
        placeholder="Enter your income source.."
        type="text"
        value={incomeSource}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIncomeSource(e.target.value)
        }
      />
      {!isIncomeSourceValid && (
        <div className="text-danger mx-3">Enter income source</div>
      )}
      <GetInput
        text="Date"
        forInput="income-date"
        id="income-date"
        placeholder="Enter date.."
        type="date"
        value={incomeDate}
        onChange={(e) => setIncomeDate(new Date(e.target.value))}
      />
      {!isIncomeDateValid && (
        <div className="text-danger mx-3">Enter valid date</div>
      )}
    </React.Fragment>
  );
};

export default Income;
