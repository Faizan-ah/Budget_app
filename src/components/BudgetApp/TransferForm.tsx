import React, { ChangeEvent, useEffect, useState } from "react";

import LabeledInput from "../LabeledInput";
import { handleOnlyNumberChange } from "../../utility/utilityMethods";
import { TransferProps } from "../../types/types";
import LabelComponent from "../Label";
import { displayErrorAlert } from "../../utility/Alert";
import { ERR_NOT_ENOUGH_BALANCE } from "../../utility/Constants";

const TransferForm = (
  props: TransferProps & {
    isSubmit: boolean;
    setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
    modalType: string;
  }
) => {
  const {
    isSubmit,
    setIsSubmit,
    toggle,
    modalType,
    currentSaving,
    setCurrentSaving,
    setTotalBalance,
    totalBalance,
  } = props;
  const [tempBalance, setTempBalance] = useState<number>(totalBalance);
  const [tempSaving, setTempSaving] = useState<number>(currentSaving);

  const resetStatesAndToggle = (): void => {
    setIsSubmit(false);
    toggle();
  };

  useEffect(() => {
    if (isSubmit) {
      if (Number(totalBalance) + Number(currentSaving) >= Number(tempSaving)) {
        setTotalBalance(tempBalance);
        setCurrentSaving(tempSaving);
        resetStatesAndToggle();
      } else {
        displayErrorAlert(ERR_NOT_ENOUGH_BALANCE);
        setIsSubmit(false);
      }
    }
  }, [isSubmit, tempBalance, tempSaving]);

  const transferAmount = () => {
    if (tempBalance === 0) {
      setTempSaving(0);
      setTempBalance(tempSaving);
      return;
    }

    if (Number(tempBalance) + Number(currentSaving) >= Number(tempSaving)) {
      setTempSaving(Number(tempSaving) + Number(tempBalance));
      setTempBalance(0);
    } else {
      tempBalance !== 0 ? displayErrorAlert(ERR_NOT_ENOUGH_BALANCE) : null;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <LabelComponent text="Your balance" />
      <h3 className="">{tempBalance}&#8364;</h3>
      <i
        className="bx bx-transfer bx-rotate-90 bx-sm mb-1 zoom"
        onClick={transferAmount}
      ></i>
      <LabeledInput
        text="Savings"
        forInput={`${modalType}-saving-input`}
        id={`${modalType}-saving-input`}
        placeholder={`Enter your savings..`}
        className="text-center"
        labelClass="text-center w-100"
        type="text"
        value={tempSaving}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnlyNumberChange(e, setTempSaving)
        }
      />
    </div>
  );
};

export default TransferForm;
