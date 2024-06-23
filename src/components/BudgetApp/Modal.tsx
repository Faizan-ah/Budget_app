import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Income from "./IncomeExpenseForm";
import { UserInputDataType } from "../../types/types";

type Props = {
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
        <Income
          modalType={modalType}
          data={data}
          setData={setData}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          toggle={toggle}
        />
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
