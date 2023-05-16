import { fireEvent, render } from "@testing-library/react";
import CarbonIntensity from "../pages/carbon-intensity";
import "@testing-library/jest-dom";
import router from "next/router";
import data from "../data/caiso_carbon_intensity.json";

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("Carbon Intensity", () => {
  it("renders the carbon intensity page with a sidebar, navbar, buttons for selecting graphs, and the carbon intensity linechart", () => {
    // Check that the components appear
    const { getByTestId } = render(<CarbonIntensity data={data} />);
    expect(getByTestId("carbon-intensity")).toBeInTheDocument();
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("graph-selector")).toBeInTheDocument();
    expect(getByTestId("linechart-selector")).toBeInTheDocument();
    expect(getByTestId("heatmap-selector")).toBeInTheDocument();
    expect(getByTestId("linechart")).toBeInTheDocument();
  });

  it("renders the sidebar with a title, and 4 options", () => {
    const { getByTestId } = render(<CarbonIntensity data={data} />);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("home-link")).toBeInTheDocument();
    expect(getByTestId("planning-and-procurement")).toBeInTheDocument();
    expect(getByTestId("delivery")).toBeInTheDocument();
    expect(getByTestId("optimization")).toBeInTheDocument();
    expect(getByTestId("monitoring-and-reporting")).toBeInTheDocument();
  });

  it("renders the navbar with a profile picture", () => {
    const { getByTestId } = render(<CarbonIntensity data={data} />);
    expect(getByTestId("dashboard-navbar")).toBeInTheDocument();
    expect(getByTestId("profile-picture")).toBeInTheDocument();
  });

  it("routes to the planning and procurement page when Planning & Procurement link on the sidebar is clicked", () => {
    const { getByTestId } = render(<CarbonIntensity data={data} />);

    const planningAndProcurementLink = getByTestId("planning-and-procurement");
    fireEvent.click(planningAndProcurementLink);

    expect(router.push).toHaveBeenCalledWith("/planning-and-procurement");
  });
});
