import { Button } from "reactstrap";
import { ButtonProps } from "../types/types";

const ButtonComponent = (props: ButtonProps) => {
  const {
    color = "primary",
    id = "",
    className = "",
    style = {},
    text = "Button",
    onClick = () => {},
    icon,
    textClassName,
  } = props;
  return (
    <Button
      id={id}
      className={className}
      color={color}
      onClick={onClick}
      style={style}
    >
      {icon}
      <span className={textClassName}>{text}</span>
    </Button>
  );
};

export default ButtonComponent;
