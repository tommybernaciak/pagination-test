import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
test("should render Pagination component", () => {
  const PAGE_COUNT = 3;
  let CURRENT_PAGE = 1;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      changeCurrentPage={changeCurrentPage}
      pageCount={PAGE_COUNT}
    />
  );
  const pagination = screen.getByTestId("pagination-root");
  expect(pagination).toBeInTheDocument();
});

test("prev button should be active when current page is not first page", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const prevButton = screen.getByTestId("pagination-prev-button");
  expect(prevButton).not.toBeDisabled();
});

test("prev button should be disabled when current page is first page", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 1;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const prevButton = screen.queryByTestId("pagination-prev-button");
  expect(prevButton).toBeDisabled();
});

test("next button should be active when current page is not last page", () => {
  const PAGE_COUNT = 3;
  const CURRENT_PAGE = 2;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const nextButton = screen.getByTestId("pagination-next-button");
  expect(nextButton).not.toBeDisabled();
});

test("next button should be disabled when current page is last page", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 4;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const nextButton = screen.queryByTestId("pagination-next-button");
  expect(nextButton).toBeDisabled();
});

test("should render button with current active page", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const currentPageButton = screen.queryByTestId(
    "pagination-current-page-button"
  );
  expect(currentPageButton).toBeInTheDocument();
});

test("current page button should have active class", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const currentPageButton = screen.queryByTestId(
    "pagination-current-page-button"
  );
  expect(currentPageButton?.classList.contains("active")).toBe(true);
});

test("buttons for not selected pages should not have active class", () => {
  const PAGE_COUNT = 4;
  const CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
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
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const buttons = screen.queryAllByText((content, element) =>
    [1, 2, 3, 4, 5].includes(Number(content))
  );
  expect(buttons.length).toBe(5);
});

test("should render siblings buttons when more than 5 pages", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 4;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const buttons = screen.queryAllByText((content, element) =>
    [2, 3, 4, 5, 6].includes(Number(content))
  );
  expect(buttons.length).toBe(5);
});

test("should render correct buttons when second page selected", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 2;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
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
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
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
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).toBeInTheDocument();
});

test("should render left dots only", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 7;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).not.toBeInTheDocument();
});

test("should render right dots only", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  const leftDotsElement = screen.queryByTestId("left-dots");
  expect(leftDotsElement).not.toBeInTheDocument();
  const rightDotsElement = screen.queryByTestId("right-dots");
  expect(rightDotsElement).toBeInTheDocument();
});

test("should call changeCurrentPage function", () => {
  const PAGE_COUNT = 8;
  const CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn();
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      pageCount={PAGE_COUNT}
      changeCurrentPage={changeCurrentPage}
    />
  );
  fireEvent.click(screen.getByText("1"));
  expect(changeCurrentPage).toHaveBeenCalledTimes(1);
});

test("current page should change when another button is clicked", () => {
  const PAGE_COUNT = 3;
  let CURRENT_PAGE = 2;
  const changeCurrentPage = jest.fn((page) => {
    CURRENT_PAGE = page;
  });
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      changeCurrentPage={changeCurrentPage}
      pageCount={PAGE_COUNT}
    />
  );
  const Button1 = screen.getByText("1");
  const Button2 = screen.getByText("2");

  expect(Button2).toHaveClass("active");
  expect(Button1).not.toHaveClass("active");
  fireEvent.click(Button1);
  expect(changeCurrentPage).toHaveBeenCalledTimes(1);
  expect(CURRENT_PAGE).toEqual(1);
});

test("current page should change when prev button is clicked", () => {
  const PAGE_COUNT = 5;
  let CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn((page) => {
    CURRENT_PAGE = page;
  });
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      changeCurrentPage={changeCurrentPage}
      pageCount={PAGE_COUNT}
    />
  );
  const prevButton = screen.getByTestId("pagination-prev-button");

  fireEvent.click(prevButton);
  expect(changeCurrentPage).toHaveBeenCalledTimes(1);
  expect(CURRENT_PAGE).toEqual(2);
});

test("current page should change when next button is clicked", () => {
  const PAGE_COUNT = 5;
  let CURRENT_PAGE = 3;
  const changeCurrentPage = jest.fn((page) => {
    CURRENT_PAGE = page;
  });
  render(
    <Pagination
      currentPage={CURRENT_PAGE}
      changeCurrentPage={changeCurrentPage}
      pageCount={PAGE_COUNT}
    />
  );
  const prevButton = screen.getByTestId("pagination-next-button");

  fireEvent.click(prevButton);
  expect(changeCurrentPage).toHaveBeenCalledTimes(1);
  expect(CURRENT_PAGE).toEqual(4);
});
