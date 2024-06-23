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
  const [amount, setAmount] = useState<string>("");
  const [amountSource, setAmountSource] = useState<string>("");
  const [amountDate, setAmountDate] = useState<Date>(new Date());
  const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
  const [isAmountSourceValid, setIsAmountSourceValid] = useState<boolean>(true);
  const [isAmountDateValid, setIsAmountDateValid] = useState<boolean>(true);

  const validate = (): boolean => {
    if (!amount.trim()) {
      setIsAmountValid(false);
      setIsSubmit(false);
      return false;
    }
    if (!amountSource.trim()) {
      setIsAmountSourceValid(false);
      setIsSubmit(false);
      return false;
    }
    if (amountDate.toString() === "Invalid Date") {
      setIsAmountDateValid(false);
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
    if (isSubmit) {
      if (validate()) {
        setData([
          ...data,
          {
            amount: modalType.includes("Expense")
              ? String(-Math.abs(Number(amount)))
              : String(amount),
            source: amountSource,
            date: formatDate(amountDate),
            timestamp: Date.now(),
            id: crypto.randomUUID(),
            type: modalType,
          },
        ]);
        resetStatesAndToggle();
      }
    }
  }, [isSubmit, amount, amountSource, amountDate]);
  return (
    <React.Fragment>
      <GetInput
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
        <div className="text-danger mx-3">Enter valid {modalType}</div>
      )}
      <GetInput
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
        <div className="text-danger mx-3">Enter {modalType} source</div>
      )}
      <GetInput
        text="Date"
        forInput={`${modalType}-date`}
        id={`${modalType}-date`}
        placeholder="Enter date.."
        type="date"
        value={amountDate}
        onChange={(e) => setAmountDate(new Date(e.target.value))}
      />
      {!isAmountDateValid && (
        <div className="text-danger mx-3">Enter valid date</div>
      )}
    </React.Fragment>
  );
};

export default Income;
