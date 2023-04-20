import { ChangeEvent } from "react";
import "./InputComponent.scss";

interface InputComponentProps {
  InputClassName: string;
  InputId: string;
  InputOnChangeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
  InputType: string;
  InputPlaceHolder: string;
}

const InputComponent = ({
  InputClassName,
  InputId,
  InputOnChangeFunction,
  InputType,
  InputPlaceHolder,
}: InputComponentProps) => {
  return (
    <input
      type={InputType}
      id={InputId}
      className={InputClassName}
      onChange={InputOnChangeFunction}
      placeholder={InputPlaceHolder}
    ></input>
  );
};

export default InputComponent;
