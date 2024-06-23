export type GenericProps = {
  id?: string;
  className?: string;
  style?: object;
};

export type LabelProps = GenericProps & { text: string; forInput: string };
export type ButtonProps = GenericProps & {
  color?: string;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  icon?: React.ReactNode;
  textClassName?: string;
};

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type InputProps<T> = GenericProps & {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type?: InputType;
  value: T;
  disable?: boolean;
};

export type UserInputDataType = {
  amount: string;
  source: string;
  date: Date | string;
  timestamp: number;
  id: string;
  type: string;
};

export type TransferProps = {
  totalBalance: number;
  currentSaving: number;
  setCurrentSaving: React.Dispatch<React.SetStateAction<number>>;
  setTotalBalance: React.Dispatch<React.SetStateAction<number>>;
  setTempSaving: React.Dispatch<React.SetStateAction<number | string>>;
};
