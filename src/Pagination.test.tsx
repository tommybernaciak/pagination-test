import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
test("renders Pagination component", () => {
  render(<Pagination currentPage={1} pageCount={3} />);
  const prevButton = screen.getByText("prev");
  expect(prevButton).toBeInTheDocument();
  const nextButton = screen.getByText("next");
  expect(nextButton).toBeInTheDocument();
});
