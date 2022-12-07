import { FC } from "react";

export interface IProps {
  text: string;
  onClick: () => void;
  testid?: string;
  cssClass?: string;
}

const Button: FC<IProps> = ({ text, onClick, testid, cssClass }) => {
  return (
    <button
      className={`button ${cssClass}`}
      onClick={onClick}
      data-testid={testid}
    >
      {text}
    </button>
  );
};

export default Button;
