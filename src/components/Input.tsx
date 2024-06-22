import { Input } from "reactstrap";
import { InputProps } from "../types/types";
import { formatDateForInputValue } from "../utility/dateUtility";

const InputComponent = <T,>(props: InputProps<T>) => {
  const {
    id = "",
    className = "",
    value = "",
    placeholder = "Enter your value..",
    style = {},
    type = "text",
    onChange = () => {},
  } = props;

  const formattedValue =
    type === "date" && value instanceof Date
      ? formatDateForInputValue(value)
      : String(value);

  return (
    <Input
      id={id}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      style={style}
      type={type}
      value={formattedValue}
    />
  );
};

export default InputComponent;
