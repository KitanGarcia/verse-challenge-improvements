import { fireEvent, render } from "@testing-library/react";
import PlanningAndProcurement from "../pages/planning-and-procurement";
import "@testing-library/jest-dom";
import router from "next/router";

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("Planning and Procurement", () => {
  it("renders the planning and procurement page with a sidebar, navbar, and 4 tiles", () => {
    // Check that the components appear
    const { getByTestId } = render(<PlanningAndProcurement />);
    expect(getByTestId("tile1")).toBeInTheDocument();
    expect(getByTestId("tile2")).toBeInTheDocument();
    expect(getByTestId("tile3")).toBeInTheDocument();
    expect(getByTestId("carbon-intensity")).toBeInTheDocument();
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("dashboard-navbar")).toBeInTheDocument();
  });

  it("renders the sidebar with a title, and 4 options", () => {
    const { getByTestId } = render(<PlanningAndProcurement />);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("home-link")).toBeInTheDocument();
    expect(getByTestId("planning-and-procurement")).toBeInTheDocument();
    expect(getByTestId("delivery")).toBeInTheDocument();
    expect(getByTestId("optimization")).toBeInTheDocument();
    expect(getByTestId("monitoring-and-reporting")).toBeInTheDocument();
  });

  it("renders the navbar with a profile picture", () => {
    const { getByTestId } = render(<PlanningAndProcurement />);
    expect(getByTestId("dashboard-navbar")).toBeInTheDocument();
    expect(getByTestId("profile-picture")).toBeInTheDocument();
  });

  it("routes to the carbon intensity page when the carbon intensity tile's set up button is clicked", () => {
    const { getByTestId } = render(<PlanningAndProcurement />);

    const setupButton = getByTestId("carbon-intensity-setup-button");
    fireEvent.click(setupButton);

    expect(router.push).toHaveBeenCalledWith("/carbon-intensity");
  });
});
