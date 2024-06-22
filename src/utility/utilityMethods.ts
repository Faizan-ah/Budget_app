import { IncomeData } from "./../types/types";
import { NUMBER_REGEX } from "./Constants";

export const handleOnlyNumberChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<T>>,
  error?: boolean,
  setError?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (e.target.value === "" || NUMBER_REGEX.test(e.target.value)) {
    if (setError) {
      setError(true);
    }
    setState(e.target.value as T);
  } else {
    if (setError) {
      setError(false);
    }
  }
};

export const calculateTotalIncome = (incomeData: IncomeData[]) => {
  return incomeData.reduce((a, b) => {
    return Number(a) + Number(b.income);
  }, 0);
};
