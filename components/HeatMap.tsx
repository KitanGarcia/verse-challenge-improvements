//@ts-nocheck
import React, { useRef, useMemo } from "react";
import * as d3 from "d3";
import { daysIntoYear } from "../data/utils";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";

interface HeatmapProps {
  data: IntensityData[];
  fields: DataField[];
  height: number;
  width: number;
}

// Pass in height and width as prop
const Heatmap: React.FC<HeatmapProps> = ({
  data,
  fields,
  height,
  width,
}: HeatmapProps) => {
  const heatmapRef = useRef<SVGSVGElement>(null);
  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

  // Bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // List of unique items that will appear on the heatmap Y axis
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => new Date(d.datetime).getUTCHours()))],
    [data]
  );

  const allXGroups = useMemo(
    () => [...new Set(data.map((d) => d.carbon_intensity))],
    [data]
  );

  // Create array containing [1, ..., 365]
  const xRange = Array.from(Array(365), (_, index) => `${index + 1}`);

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
