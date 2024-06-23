import LabelComponent from "./Label";
import InputComponent from "./Input";
import { InputProps, LabelProps } from "../types/types";

const LabeledInput = <T,>(
  props: LabelProps &
    InputProps<T> & { labelClass?: string; parentDivClass?: string }
) => {
  const {
    text: labelText,
    forInput,
    value,
    id,
    placeholder,
    type = "text",
    onChange,
    style,
    className,
    disable,
    labelClass,
    parentDivClass,
  } = props;
  return (
    <div className={parentDivClass}>
      <LabelComponent
        text={labelText}
        className={labelClass}
        forInput={forInput}
      />
      <InputComponent
        id={id}
        placeholder={placeholder}
        type={type}
        style={style}
        className={className}
        value={value}
        onChange={onChange}
        disable={disable}
      />
    </div>
  );
};

export default LabeledInput;
