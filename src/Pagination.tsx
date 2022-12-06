import { FC } from "react";
import Button from "./Button";

export interface IProps {
  currentPage: number;
  pageCount: number;
}

const Pagination: FC<IProps> = ({ currentPage, pageCount }) => {
  return (
    <div className="pagination">
      <Button text={"prev"} onClick={() => {}} />

      <Button text={"next"} onClick={() => {}} />
    </div>
  );
};

export default Pagination;
