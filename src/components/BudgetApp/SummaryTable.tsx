import React from "react";
import { Table } from "reactstrap";

import { UserInputDataType } from "../../types/types";
import ButtonComponent from "../Button";
import { calculateTotal } from "../../utility/utilityMethods";
import { displayErrorAlert } from "../../utility/Alert";
import { ERR_BALANCE_CANT_BE_NEGATIVE } from "../../utility/Constants";
import { saveDataToLocalStorage } from "../../store";

type Props = {
  titleArray: Array<string>;
  mergedData: Array<UserInputDataType>;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  setMergedData: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
  setIncome: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
  setExpense: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
  setCurrentSaving: React.Dispatch<React.SetStateAction<number>>;
};

const SummaryTable = (props: Props) => {
  const {
    titleArray,
    mergedData,
    totalIncome,
    totalExpense,
    totalBalance,
    setMergedData,
    setIncome,
    setExpense,
    setCurrentSaving,
  } = props;

  const deleteRecord = (record: UserInputDataType) => {
    const updatedArr = mergedData.filter((data) => data.id !== record.id);
    const newTotalBalance = calculateTotal(updatedArr);

    if (newTotalBalance < 0) {
      displayErrorAlert(ERR_BALANCE_CANT_BE_NEGATIVE);
      return;
    }
    const updateStates = (prev: UserInputDataType[]) => {
      const updated = prev.filter((data) => data.id !== record.id);
      saveDataToLocalStorage(`${record.type}-data`, updated);
      return updated;
    };
    if (record.type === "Income") {
      setIncome((prevIncome) => updateStates(prevIncome));
    } else {
      setExpense((prevExpense) => updateStates(prevExpense));
    }
    if (!updatedArr.length) {
      setCurrentSaving(() => {
        saveDataToLocalStorage("savings", 0);
        return 0;
      });
    }
    setMergedData(updatedArr);
  };

  const DisplaySummary = () => {
    if (!mergedData || mergedData.length === 0) {
      return null; // Return null if there is no data
    }

    return (
      <>
        {["income", "expense", "balance"].map((type, index) => (
          <tr key={index} className="text-center">
            <th className="bg-light" scope="row">
              Total {type}:
            </th>
            <td className="bg-light"></td>
            <td className="bg-light"></td>
            <td className="bg-light text-left">
              <b>
                {Number(
                  type === "income"
                    ? totalIncome
                    : type === "expense"
                    ? totalExpense
                    : totalBalance
                ).toFixed(2)}
              </b>
            </td>
            <td className="bg-light"></td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <React.Fragment>
      <Table className="summary-table">
        <thead className="text-center">
          <tr>
            <th>#</th>
            {titleArray.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="scrollable-tbody">
          {mergedData?.map((data, index) => (
            <tr className="align-middle text-center" key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.date.toString()}</td>
              <td className="mw-50 text-truncate" title={data.source}>
                {data.source}
              </td>
              <td>{data.amount}</td>
              <td>
                <ButtonComponent
                  icon={<i className="bx bx-trash"></i>}
                  text="Delete"
                  color="danger"
                  onClick={() => deleteRecord(data)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <DisplaySummary />
        </tfoot>
      </Table>
      {mergedData && mergedData.length === 0 && (
        <h3 className="text-center">No data available</h3>
      )}
    </React.Fragment>
  );
};
export default SummaryTable;
