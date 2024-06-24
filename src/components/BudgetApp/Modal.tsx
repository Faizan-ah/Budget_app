import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import IncomeExpenseForm from "./IncomeExpenseForm";
import { TransferProps, UserInputDataType } from "../../types/types";
import TransferForm from "./TransferForm";

type Props = TransferProps & {
  modalTitle: string;
  toggle: () => void;
  isModalOpen: boolean;
  id: string;
  setData: React.Dispatch<React.SetStateAction<UserInputDataType[]>>;
  data: Array<UserInputDataType>;
};

const InputModal = (props: Props) => {
  const {
    modalTitle,
    toggle,
    isModalOpen,
    id: modalType,
    setData,
    data,
    totalBalance,
    currentSaving,
    setCurrentSaving,
    setTotalBalance,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const onClickModalSuccess = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsSubmit(true);
  };

  return (
    <Modal id={modalType} isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody>
        {modalType === "Transfer" ? (
          <TransferForm
            modalType={modalType}
            toggle={toggle}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
            totalBalance={totalBalance}
            currentSaving={currentSaving}
            setCurrentSaving={setCurrentSaving}
            setTotalBalance={setTotalBalance}
          />
        ) : (
          <IncomeExpenseForm
            modalType={modalType}
            data={data}
            setData={setData}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            toggle={toggle}
            totalBalance={totalBalance}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClickModalSuccess}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
