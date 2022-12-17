import { FC } from "react";
import Button from "./Button";

export interface IProps {
  currentPage: number;
  changeCurrentPage: (page: number) => void;
  pageCount: number;
}

const BUTTONS_LIMIT = 5;
const MAX_SIBLING_COUNT = 2;

const Pagination: FC<IProps> = ({
  currentPage,
  changeCurrentPage,
  pageCount,
}) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === pageCount;

  const isCurrentPage = (p: number) => p === currentPage;

  const getVisibleButtons = () => {
    const currentPageIndex = currentPage - 1;
    if (pages.length <= BUTTONS_LIMIT) return pages;
    const leftSiblingIndex = currentPageIndex - MAX_SIBLING_COUNT;
    const leftIndex = leftSiblingIndex < 0 ? 0 : leftSiblingIndex;
    const rightSiblingIndex = currentPageIndex + MAX_SIBLING_COUNT;
    const rightIndex =
      rightSiblingIndex > pageCount ? pageCount : rightSiblingIndex;

    return pages.slice(leftIndex, rightIndex + 1);
  };
  const visibleButtons = getVisibleButtons();
  const showLeftDots = visibleButtons[0] !== 1;
  const showRightDots = visibleButtons[visibleButtons.length - 1] !== pageCount;

  return (
    <div className="pagination" data-testid="pagination-root">
      <Button
        testid="pagination-prev-button"
        text={"prev"}
        onClick={() => changeCurrentPage(currentPage - 1)}
        disabled={isFirstPageActive}
      />
      {showLeftDots && (
        <div data-testid="left-dots" className="dots">
          ...
        </div>
      )}
      {visibleButtons.map((page: number) => {
        return (
          <Button
            key={page}
            testid={isCurrentPage(page) ? "pagination-current-page-button" : ""}
            text={`${page}`}
            onClick={() => changeCurrentPage(page)}
            cssClass={isCurrentPage(page) ? "active" : ""}
          />
        );
      })}
      {showRightDots && (
        <div data-testid="right-dots" className="dots">
          ...
        </div>
      )}
      <Button
        testid="pagination-next-button"
        text={"next"}
        onClick={() => changeCurrentPage(currentPage + 1)}
        disabled={isLastPageActive}
      />
    </div>
  );
};

export default Pagination;
