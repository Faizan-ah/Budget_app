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
  } = props;
  return (
    <Button
      id={id}
      className={className}
      color={color}
      onClick={onClick}
      style={style}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
