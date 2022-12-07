import { FC } from "react";
import Button from "./Button";

export interface IProps {
  currentPage: number;
  pageCount: number;
}

const Pagination: FC<IProps> = ({ currentPage, pageCount }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === pageCount;
  const isCurrentPage = (p: number) => p === currentPage;
  return (
    <div className="pagination" data-testid="pagination-root">
      {!isFirstPageActive && (
        <Button
          testid="pagination-prev-button"
          text={"prev"}
          onClick={() => {}}
        />
      )}
      {pages.map((page: number) => {
        return (
          <Button
            testid={isCurrentPage(page) ? "pagination-current-page-button" : ""}
            text={`${page}`}
            onClick={() => {}}
            cssClass={isCurrentPage(page) ? "active" : ""}
          />
        );
      })}
      {!isLastPageActive && (
        <Button
          testid="pagination-next-button"
          text={"next"}
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default Pagination;
