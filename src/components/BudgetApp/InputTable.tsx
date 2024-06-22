import React from "react";
import { Table } from "reactstrap";

import { IncomeData } from "../../types/types";

type Props = {
  titleArray: Array<string>;
  data: Array<IncomeData>;
  totalIncome: number;
};

const InputTable = (props: Props) => {
  const { titleArray, data: incomeData, totalIncome } = props;
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
          {incomeData?.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.date.toString()}</td>
              <td>{data.income}</td>
              <td>{data.source}</td>
            </tr>
          ))}
          {incomeData && incomeData.length !== 0 && (
            <tr>
              <th className="bg-light" scope="row">
                Total Income:
              </th>
              <td className="bg-light"></td>
              <td className="bg-light"></td>
              <td className="bg-light">
                <b>{totalIncome}</b>
              </td>
            </tr>
          )}
        </tbody>
      </Table>{" "}
      {incomeData && incomeData.length === 0 && (
        <h3 className="text-center w-50">No data available</h3>
      )}
    </React.Fragment>
  );
};
export default InputTable;
