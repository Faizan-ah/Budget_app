import LabelComponent from "../Label";
import InputComponent from "../Input";
import { InputProps, LabelProps } from "../../types/types";

const GetInput = <T,>(props: LabelProps & InputProps<T>) => {
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
  } = props;
  return (
    <div className="m-3">
      <LabelComponent text={labelText} forInput={forInput} />
      <InputComponent
        id={id}
        placeholder={placeholder}
        type={type}
        style={style}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default GetInput;
