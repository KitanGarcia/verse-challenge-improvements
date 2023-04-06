//@ts-nocheck
import React, { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";

interface HeatmapProps {}

// Pass in height and width as prop
const Heatmap: React.FC<HeatmapProps> = () => {
  const heatmapRef = useRef<SVGSVGElement>(null);
  const height = 600;
  const width = 900;
  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const daysIntoYear = (date) => {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  };

  // List of unique items that will appear on the heatmap Y axis
  const data = useMemo(
    () => [
      {
        datetime: "2019-12-01T00:00:00.000Z",
        carbon_intensity: 414,
      },
      {
        datetime: "2019-12-01T01:00:00.000Z",
        carbon_intensity: 416,
      },
      {
        datetime: "2019-12-01T02:00:00.000Z",
        carbon_intensity: 410,
      },
      {
        datetime: "2019-12-01T03:00:00.000Z",
        carbon_intensity: 403,
      },
      {
        datetime: "2019-12-01T04:00:00.000Z",
        carbon_intensity: 402,
      },
      {
        datetime: "2019-12-01T05:00:00.000Z",
        carbon_intensity: 405,
      },
      {
        datetime: "2019-12-01T06:00:00.000Z",
        carbon_intensity: 410,
      },
      {
        datetime: "2019-12-01T07:00:00.000Z",
        carbon_intensity: 407,
      },
      {
        datetime: "2019-12-01T08:00:00.000Z",
        carbon_intensity: 407,
      },
      {
        datetime: "2019-12-02T06:00:00.000Z",
        carbon_intensity: 410,
      },
      {
        datetime: "2019-12-03T07:00:00.000Z",
        carbon_intensity: 407,
      },
      {
        datetime: "2019-12-04T03:00:00.000Z",
        carbon_intensity: 407,
      },
    ],
    []
  );
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => new Date(d.datetime).getUTCHours()))],
    [data]
  );

  const allXGroups = useMemo(
    () => [...new Set(data.map((d) => d.carbon_intensity))],
    [data]
  );

  // Create array containing [1, ..., 365]
  const xRange = Array.from(Array(365), (_, index) => index + 1);

  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, boundsWidth]).domain(xRange).padding(0.01);
  }, [xRange, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  const [min, max] = d3.extent(data.map((d) => d.carbon_intensity));
  console.log("==============");
  console.log(min, max);

  // xScale("A") -> 0
  // xScale.bandwidth() -> 11

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max]);

  const allRects = data.map((d, i) => {
    let y = new Date(d.datetime).getUTCHours();
    let x = daysIntoYear(new Date(d.datetime));
    console.log(y);
    console.log(x);

    if (d.value === null) {
      return;
    }
    return (
      <rect
        key={i}
        x={xScale(x)}
        y={yScale(y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.carbon_intensity)}
      />
    );
  });

  /*
  const xLabels = xRange.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });
  */

  console.log("Y", allYGroups);
  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <svg width={width} height={height} ref={heatmapRef}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
        {yLabels}
      </g>
    </svg>
  );
};

export default Heatmap;
