import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
test("should render Pagination component", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 1;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.getByTestId("pagination-root");
  expect(prevButton).toBeInTheDocument();
});

test("should render prev button when current page is not 1", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.getByTestId("pagination-prev-button");
  expect(prevButton).toBeInTheDocument();
});

test("should not render prev button when current page is 1", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 1;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.queryByTestId("pagination-prev-button");
  expect(prevButton).not.toBeInTheDocument();
});

test("should render next button when current page is not last", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const nextButton = screen.getByTestId("pagination-next-button");
  expect(nextButton).toBeInTheDocument();
});

test("should not render next button when current page is last", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 4;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const nextButton = screen.queryByTestId("pagination-next-button");
  expect(nextButton).not.toBeInTheDocument();
});

test("should render button with current active page", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const currentPageButton = screen.queryByTestId(
    "pagination-current-page-button"
  );
  expect(currentPageButton).toBeInTheDocument();
});

test("current page button should have active class", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const currentPageButton = screen.queryByTestId(
    "pagination-current-page-button"
  );
  expect(currentPageButton?.classList.contains("active")).toBe(true);
});

test("should render buttons for all pages", () => {
  const PAGE_COUNT = 6;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const buttons = screen.queryAllByText((content, element) =>
    [1, 2, 3, 4, 5, 6].includes(Number(content))
  );
  expect(buttons.length).toBe(6);
});
