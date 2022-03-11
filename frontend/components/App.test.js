import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppClass from "./AppClass";

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
});
