import React from "react";
import { Table } from "reactstrap";

import { UserInputDataType } from "../../types/types";

type Props = {
  titleArray: Array<string>;
  mergedData: Array<UserInputDataType>;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

const InputTable = (props: Props) => {
  const { titleArray, mergedData, totalIncome, totalExpense, balance } = props;

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
          <td className="bg-light">
            <b>
              {type === "income"
                ? totalIncome
                : type === "expense"
                ? totalExpense
                : balance}
            </b>
          </td>
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
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.date.toString()}</td>
              <td>{data.value}</td>
              <td>{data.source}</td>
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
export default InputTable;
