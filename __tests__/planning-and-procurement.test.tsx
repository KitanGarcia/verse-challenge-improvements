import { fireEvent, render } from "@testing-library/react";
import PlanningAndProcurement from "../pages/planning-and-procurement";
import "@testing-library/jest-dom";

describe("Planning and Procurement", () => {
  it("renders the planning and procurement page with a sidebar, navbar, and 4 tiles", () => {
    const { getByTestId } = render(<PlanningAndProcurement />);

    // Check that the components appear
    expect(getByTestId("tile1")).toBeInTheDocument();
    expect(getByTestId("tile2")).toBeInTheDocument();
    expect(getByTestId("tile3")).toBeInTheDocument();
    expect(getByTestId("tile4")).toBeInTheDocument();
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("dashboardNavbar")).toBeInTheDocument();
  });
});
