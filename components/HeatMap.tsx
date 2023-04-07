import React, { useRef, useMemo } from "react";
import * as d3 from "d3";
import { daysIntoYear } from "../utils/data";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";
import HeatMapLegend from "../components/HeatMapLegend";

interface HeatmapProps {
  data: IntensityData[];
  min: number;
  max: number;
  fields: DataField[];
  height: number;
  width: number;
}

// Pass in height and width as prop
const Heatmap: React.FC<HeatmapProps> = ({
  data,
  min,
  max,
  fields,
  height,
  width,
}: HeatmapProps) => {
  const heatmapRef = useRef<SVGSVGElement>(null);
  const margin = { top: 10, right: 10, bottom: 30, left: 30 };

  // Bounds = area inside the axis
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  // List of unique items that will appear on the heatmap Y axis
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => new Date(d.datetime).getUTCHours()))],
    [data]
  );

  // Create array containing [1, ..., 365]
  const xRange = Array.from(Array(365), (_, index) => `${index + 1}`);

  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, boundsWidth]).domain(xRange).padding(0.01);
  }, [xRange, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand<number>()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max] as number[]);

  const allRects = data.map((d, i) => {
    let y = new Date(d.datetime).getUTCHours();
    let x = daysIntoYear(new Date(d.datetime));

    if (d.carbon_intensity === null) {
      return;
    }
    return (
      <rect
        key={i}
        x={xScale(`${x}`)}
        y={yScale(y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.carbon_intensity)}
      />
    );
  });

  const hourLabels = allYGroups.map((name, i) => {
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

  const dateRangeLabels = [0, width - 70].map((value, i) => {
    return (
      <text
        key={i}
        x={value}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {i === 0 ? "January 1" : "December 31"}
      </text>
    );
  });

  return (
    <div className="flex justify-center flex-col items-center">
      <div>
        <div className="flex justify-evenly rounded-md border-2 bg-nav-bg text-center">
          <h2 className="my-4 text-black cursor-pointer">2019</h2>
          <h2 className="my-4 text-secondary-text cursor-pointer">2020</h2>
          <h2 className="my-4 text-secondary-text cursor-pointer">2021</h2>
          <h2 className="my-4 text-secondary-text cursor-pointer">2022</h2>
        </div>
        <svg width={width} height={height} ref={heatmapRef}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[margin.left, margin.top].join(",")})`}
          >
            {allRects}
            {dateRangeLabels}
            {hourLabels}
          </g>
        </svg>
      </div>
      <HeatMapLegend
        width={500}
        height={100}
        max={max as number}
        min={min as number}
      />
    </div>
  );
};

export default Heatmap;
