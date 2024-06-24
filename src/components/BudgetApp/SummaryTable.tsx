import React from "react";
import { Table } from "reactstrap";

import { UserInputDataType } from "../../types/types";
import ButtonComponent from "../Button";
import { calculateTotal } from "../../utility/utilityMethods";
import { displayErrorAlert } from "../../utility/Alert";
import { ERR_BALANCE_CANT_BE_NEGATIVE } from "../../utility/Constants";

type Props = {
  titleArray: Array<string>;
  mergedData: Array<UserInputDataType>;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  setMergedData: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
  setIncome: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
  setExpense: React.Dispatch<React.SetStateAction<Array<UserInputDataType>>>;
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
  } = props;

  const deleteRecord = (record: UserInputDataType) => {
    const updatedArr = mergedData.filter((data) => data.id !== record.id);
    const newTotalBalance = calculateTotal(updatedArr);

    if (newTotalBalance < 0) {
      displayErrorAlert(ERR_BALANCE_CANT_BE_NEGATIVE);
      return;
    }

    if (record.type === "Income") {
      setIncome((prevIncome) =>
        prevIncome.filter((data) => data.id !== record.id)
      );
    } else {
      setExpense((prevExpense) =>
        prevExpense.filter((data) => data.id !== record.id)
      );
    }
    setMergedData(updatedArr);
  };

  const DisplaySummary = () => {
    return (
      mergedData &&
      mergedData.length !== 0 &&
      ["income", "expense", "balance"].map((type, index) => (
        <tr key={index}>
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
      ))
    );
  };
  return (
    <React.Fragment>
      <Table className="w-50">
        <thead>
          <tr>
            <th>#</th>
            {titleArray.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mergedData?.map((data, index) => (
            <tr className="align-middle" key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.date.toString()}</td>
              <td>{data.amount}</td>
              <td>{data.source}</td>
              <td>
                <ButtonComponent
                  icon={<i className="bx bx-trash"></i>}
                  text="Delete"
                  color="danger"
                  onClick={() => {
                    deleteRecord(data);
                  }}
                />
              </td>
            </tr>
          ))}
          <DisplaySummary />
        </tbody>
      </Table>{" "}
      {mergedData && mergedData.length === 0 && (
        <h3 className="text-center w-50">No data available</h3>
      )}
    </React.Fragment>
  );
};
export default SummaryTable;
