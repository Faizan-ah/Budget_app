import React, { ChangeEvent, useEffect, useState } from "react";

import LabeledInput from "../LabeledInput";
import { handleOnlyNumberChange } from "../../utility/utilityMethods";
import { UserInputDataType } from "../../types/types";
import { formatDate } from "../../utility/dateUtility";
import { displayErrorAlert } from "../../utility/Alert";
import { ERR_NOT_ENOUGH_BALANCE } from "../../utility/Constants";

const IncomeExpenseForm = (props: {
  data: UserInputDataType[];
  isSubmit: boolean;
  setData: React.Dispatch<React.SetStateAction<UserInputDataType[]>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  modalType: string;
  totalBalance: number;
}) => {
  const {
    data,
    isSubmit,
    setData,
    setIsSubmit,
    toggle,
    modalType,
    totalBalance,
  } = props;
  const [amount, setAmount] = useState<string>("");
  const [amountSource, setAmountSource] = useState<string>("");
  const [amountDate, setAmountDate] = useState<Date>(new Date());
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
  const [isAmountSourceValid, setIsAmountSourceValid] = useState<boolean>(true);
  const [isAmountDateValid, setIsAmountDateValid] = useState<boolean>(true);

  const validate = (): boolean => {
    const isAmountEmpty = !amount.trim();
    const isAmountSourceEmpty = !amountSource.trim();
    const isDateInvalid = amountDate.toString() === "Invalid Date";

    if (isAmountEmpty || isAmountSourceEmpty || isDateInvalid) {
      setIsAmountValid(!isAmountEmpty);
      setIsAmountSourceValid(!isAmountSourceEmpty);
      setIsAmountDateValid(!isDateInvalid);
      setIsSubmit(false);
      return false;
    }
    return true;
  };

  const resetStatesAndToggle = (): void => {
    setAmount("");
    setAmountDate(new Date());
    setAmountSource("");
    setIsAmountValid(true);
    setIsAmountDateValid(true);
    setIsAmountSourceValid(true);
    setIsSubmit(false);
    toggle();
  };

  useEffect(() => {
    if (!isSubmit) return;

    const handleDataSubmit = () => {
      if (
        modalType.includes("Expense") &&
        Number(totalBalance) < Number(amount)
      ) {
        displayErrorAlert(ERR_NOT_ENOUGH_BALANCE);
        setIsSubmit(false);
        return;
      }
      const newAmount = modalType.includes("Expense")
        ? String(-Math.abs(Number(amount)))
        : String(amount);

      const newData = {
        amount: newAmount,
        source: amountSource,
        date: formatDate(amountDate),
        timestamp: Date.now(),
        id: crypto.randomUUID(),
        type: modalType,
      };

      setData((prevData) => [...prevData, newData]);
      resetStatesAndToggle();
    };

    if (validate()) {
      handleDataSubmit();
    }
  }, [isSubmit]);

  return (
    <React.Fragment>
      <LabeledInput
        parentDivClass="m-1"
        text={modalType}
        forInput={`${modalType}-input`}
        id={`${modalType}-input`}
        placeholder={`Enter your ${modalType}..`}
        type="text"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnlyNumberChange(e, setAmount, setIsAmountValid)
        }
      />
      {!isAmountValid && (
        <div className="text-danger mx-1">Enter valid {modalType}</div>
      )}
      <LabeledInput
        parentDivClass="m-1"
        text={`${modalType} Source`}
        forInput={`${modalType}-source`}
        id={`${modalType}-source`}
        placeholder={`Enter your ${modalType} source..`}
        type="text"
        value={amountSource}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmountSource(e.target.value)
        }
      />
      {!isAmountSourceValid && (
        <div className="text-danger mx-1">Enter {modalType} source</div>
      )}
      <LabeledInput
        parentDivClass="m-1"
        text="Date"
        forInput={`${modalType}-date`}
        id={`${modalType}-date`}
        placeholder="Enter date.."
        type="date"
        value={amountDate}
        onChange={(e) => setAmountDate(new Date(e.target.value))}
      />
      {!isAmountDateValid && (
        <div className="text-danger mx-1">Enter valid date</div>
      )}
    </React.Fragment>
  );
};

export default IncomeExpenseForm;
