import React, { ChangeEvent, useEffect, useState } from "react";

import LabeledInput from "../LabeledInput";
import { handleOnlyNumberChange } from "../../utility/utilityMethods";
import { TransferProps } from "../../types/types";

//TODO: complete functionality
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
    setTempSaving: setTempCurrentSaving,
  } = props;
  const [tempBalance, setTempBalance] = useState<number>(totalBalance);
  const [tempSaving, setTempSaving] = useState<number>(currentSaving);

  const resetStatesAndToggle = (): void => {
    setIsSubmit(false);
    toggle();
  };

  useEffect(() => {
    if (isSubmit) {
      setTotalBalance(tempBalance);
      setCurrentSaving(tempSaving);
      setTempCurrentSaving(tempSaving);
      resetStatesAndToggle();
    }
  }, [isSubmit, tempBalance, tempSaving]);

  const transferAmount = () => {
    if (tempBalance === 0) {
      setTempSaving(0);
      //TODO: Remove Number tag if balance input is not disabled in the future.
      setTempBalance(Number(tempSaving));
    } else {
      setTempSaving(Number(tempSaving) + Number(tempBalance));
      setTempBalance(0);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <LabeledInput
        text="Balance"
        forInput={`${modalType}-balance-input`}
        id={`${modalType}-balance-input`}
        placeholder={`Enter your balance..`}
        type="text"
        value={tempBalance}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnlyNumberChange(e, setTempBalance)
        }
        disable={true}
      />
      <i
        className="bx bx-transfer bx-sm mx-2 zoom"
        style={{ marginTop: "30px" }}
        onClick={transferAmount}
      ></i>
      <LabeledInput
        text="Savings"
        forInput={`${modalType}-saving-input`}
        id={`${modalType}-saving-input`}
        placeholder={`Enter your savings..`}
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
