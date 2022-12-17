import { FC } from "react";

export interface IProps {
  text: string;
  onClick: () => void;
  testid?: string;
  cssClass?: string;
  disabled?: boolean;
}

const Button: FC<IProps> = ({ text, onClick, testid, cssClass, disabled }) => {
  return (
    <button
      className={`button ${cssClass}`}
      onClick={onClick}
      data-testid={testid}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
