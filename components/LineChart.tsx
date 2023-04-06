import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";

interface LineChartProps {
  data: IntensityData[];
  fields: DataField[];
  width: number;
  height: number;
}

const LineChart = ({ data, fields, width, height }: LineChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.datetime)) as [Date, Date])
      .range([margin.left, chartWidth - margin.right]);

    const y = d3
      .scaleLinear()
      // Get rid of undefined intensities
      .domain([
        0,
        d3.max(
          data.filter((d) => d.datetime && d.carbon_intensity !== undefined),
          (d) => d.carbon_intensity
        ),
      ] as number[])
      .nice()
      .range([chartHeight - margin.bottom, margin.top]);

    const line = d3
      .line<IntensityData>()
      .x((d) => x(new Date(d.datetime)))
      .y((d) => y(d.carbon_intensity));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  }, [chartRef, data, height, width]);

  return <svg className="mx-auto" ref={chartRef}></svg>;
};

export default LineChart;
