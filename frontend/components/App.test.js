import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppClass from "./AppClass";

const emailInput = () => screen.getByPlaceholderText("type email");
const submitBtn = () => screen.getByTestId("submit")
// Write your tests here
beforeEach(() => {
  render(<AppClass />);
});

afterEach(() => {
  window.localStorage.clear();
});

describe("AppClass component", () => {
  test("sanity", () => {
    expect(true).toBe(true);
  });

  test("Renders the heading", () => {
    const heading = screen.queryAllByText("Coordinates", { exact: false });
    expect(heading).toBeVisible();
    expect(heading).toBeInTheDocument();
  })

  test("can enter a new email and it renders to the screen", async () => {
    fireEvent.change(emailInput(), { target: { value: "abc123@email.com" }})
    fireEvent.click(submitBtn());
    await screen.findByText("abc123 win", { exact: false });
  })
});
