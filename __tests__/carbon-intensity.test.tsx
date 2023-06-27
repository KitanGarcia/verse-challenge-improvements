import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CarbonIntensity from "../pages/carbon-intensity";
import "@testing-library/jest-dom";
import router from "next/router";
import data from "../data/caiso_carbon_intensity.json";

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

jest.mock("d3", () => ({
  scaleTime: jest.fn().mockReturnThis(),
  scaleLinear: jest.fn().mockReturnThis(),
  line: jest.fn().mockReturnThis(),
  area: jest.fn().mockReturnThis(),
  scaleBand: jest.fn().mockReturnThis(),
  scaleSequential: jest.fn().mockReturnThis(),
  interpolator: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  selectAll: jest.fn().mockReturnThis(),
  transition: jest.fn().mockReturnThis(),
  duration: jest.fn().mockReturnThis(),
  append: jest.fn().mockReturnThis(),
  attr: jest.fn().mockReturnThis(),
  style: jest.fn().mockReturnThis(),
  data: jest.fn().mockReturnThis(),
  call: jest.fn().mockReturnThis(),
  axisBottom: jest.fn(),
  axisLeft: jest.fn(),
  domain: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  padding: jest.fn(),
  nice: jest.fn().mockReturnThis(),
  x: jest.fn().mockReturnThis(),
  y: jest.fn().mockReturnThis(),
  y0: jest.fn().mockReturnThis(),
  y1: jest.fn().mockReturnThis(),
  text: jest.fn().mockReturnThis(),
  node: jest.fn().mockReturnThis(),
  getTotalLength: jest.fn(),
  xScale: jest.fn(),
  yScale: jest.fn(),
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

  it("renders the heatmap and heatmap legend when Heat Map on the Graph Selector is selected", async () => {
    const { getByTestId } = render(<CarbonIntensity data={data} />);

    const heatmapButton = getByTestId("heatmap-selector");
    fireEvent.click(heatmapButton);

    await waitFor(async () => {
      expect(getByTestId("heatmap")).toBeInTheDocument();
      expect(getByTestId("heatmap-legend")).toBeInTheDocument();
    });
  });
});
