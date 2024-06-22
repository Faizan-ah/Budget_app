import { Label } from "reactstrap";
import { LabelProps } from "../types/types";
const LabelComponent = (props: LabelProps) => {
  const { text, className, id, style, forInput } = props;
  return (
    <Label id={id} className={className} style={style} for={forInput}>
      {text}
    </Label>
  );
};

export default LabelComponent;
