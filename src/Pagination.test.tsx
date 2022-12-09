import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
test("should render Pagination component", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 1;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.getByTestId("pagination-root");
  expect(prevButton).toBeInTheDocument();
});

test("should render prev button when current page is not first page", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.getByTestId("pagination-prev-button");
  expect(prevButton).toBeInTheDocument();
});

test("should not render prev button when current page is first page", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 1;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const prevButton = screen.queryByTestId("pagination-prev-button");
  expect(prevButton).not.toBeInTheDocument();
});

test("should render next button when current page is not last page", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const nextButton = screen.getByTestId("pagination-next-button");
  expect(nextButton).toBeInTheDocument();
});

test("should not render next button when current page is last page", () => {
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

test("buttons for not selected pages should not have active class", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const buttons = screen.queryAllByText((content, element) =>
    [1, 2, 4].includes(Number(content))
  );
  buttons.forEach((button) => {
    expect(button?.classList.contains("active")).toBe(false);
  });
});

test("should render buttons for all pages when less than 6", () => {
  const PAGE_COUNT = 5;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const buttons = screen.queryAllByText((content, element) =>
    [1, 2, 3, 4, 5].includes(Number(content))
  );
  expect(buttons.length).toBe(5);
});

test("should render siblings buttons when more than 5 pages", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 4;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const buttons = screen.queryAllByText((content, element) =>
    [2, 3, 4, 5, 6].includes(Number(content))
  );
  expect(buttons.length).toBe(5);
});

test("should render correct buttons when second page selected", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 2;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const buttons = screen.queryAllByText((content, element) =>
    [1, 2, 3, 4].includes(Number(content))
  );
  expect(buttons.length).toBe(4);
  const Page5Button = screen.queryByText("5");
  expect(Page5Button).not.toBeInTheDocument();
  const Page6Button = screen.queryByText("6");
  expect(Page6Button).not.toBeInTheDocument();
  const Page7Button = screen.queryByText("7");
  expect(Page7Button).not.toBeInTheDocument();
  const Page8Button = screen.queryByText("8");
  expect(Page8Button).not.toBeInTheDocument();
});

test("should not render buttons that are not siblings", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 4;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const firstPageButton = screen.queryByText("1");
  expect(firstPageButton).not.toBeInTheDocument();
  const sevenPageButton = screen.queryByText("7");
  expect(sevenPageButton).not.toBeInTheDocument();
  const eightPageButton = screen.queryByText("8");
  expect(eightPageButton).not.toBeInTheDocument();
});

test("should render dots when not every page button is rendered", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 4;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).toBeInTheDocument();
});

test("should render left dots only", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 7;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).not.toBeInTheDocument();
});

test("should render right dots only", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 3;
  render(<Pagination currentPage={CURRENT_PAGE} pageCount={PAGE_COUNT} />);
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).not.toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).toBeInTheDocument();
});
