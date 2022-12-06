import { FC } from "react";

export interface IProps {
  text: string;
  onClick: () => void;
}

const Button: FC<IProps> = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
