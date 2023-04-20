import "./ButtonComponent.scss";

interface ButtonComponentProps {
  buttonContent: string;
  buttonOnClickFunction?: () => void;
  buttonClassName?: string;
}

const ButtonComponent = ({
  buttonContent,
  buttonOnClickFunction,
  buttonClassName,
}: ButtonComponentProps) => {
  return (
    <button className={buttonClassName} onClick={buttonOnClickFunction}>
      {buttonContent}
    </button>
  );
};

export default ButtonComponent;
