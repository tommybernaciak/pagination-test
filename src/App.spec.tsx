import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

test("should render App component", () => {
  render(<App />);
  const app = screen.getByTestId("app-root");
  expect(app).toBeInTheDocument();
});

test("should have page header", () => {
  render(<App />);
  const header = screen.queryByText("Pagination test");
  expect(header).toBeInTheDocument();
});

test("button class should change when another button is clicked", () => {
  render(<App />);

  const Button1 = screen.getByText("1");
  const Button2 = screen.getByText("2");

  expect(Button2).toHaveClass("active");
  expect(Button1).not.toHaveClass("active");
  fireEvent.click(Button1);

  expect(Button2).not.toHaveClass("active");
  expect(Button1).toHaveClass("active");
});
