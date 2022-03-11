import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppClass from "./AppClass";

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
    const heading = screen.queryByText("Coordinates", { exact: false });
    expect(heading).toBeVisible();
    expect(heading).toBeInTheDocument();
  })

  test("Renders the counter", () => {
    const counter = screen.queryByText("You moved 0 times", { exact: false });
    expect(counter).toBeVisible();
    expect(counter).toBeInTheDocument();
  })
});
