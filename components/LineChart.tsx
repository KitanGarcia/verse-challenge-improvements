import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import * as d3 from "d3";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";

interface LineChartProps {
  data: IntensityData[];
  min: number;
  max: number;
  fields: DataField[];
  width: number;
  height: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LineChart = ({
  data,
  min,
  max,
  fields,
  width,
  height,
  setIsLoading,
}: LineChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [setIsLoading, data]);

  useEffect(() => {
    // Hacky solution. Was drawing an extra 0 since max is init as usestate(0)
    if (max <= 0) {
      return;
    }

    const margin = { top: 10, right: 10, bottom: 15, left: 10 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // x time scale
    // Gets input between min and max date
    // And maps it to fit in the given range corresponding to width
    const x = d3
      .scaleTime()
      .domain([
        new Date(data[0].datetime),
        new Date(data[data.length - 1].datetime),
      ])
      .range([margin.left - 10, chartWidth - margin.right]);

    d3.selectAll("path.area").remove();
    d3.selectAll("path.line").remove();
    d3.selectAll("y.axis").remove();
    d3.selectAll("y-axis").remove();
    d3.selectAll(".title").remove();

    // y scale
    // Gets input between 0 and max intensity
    // Rounds domain to "nice" values
    // And maps it to fit in the given range corresponding to height
    const y = d3
      .scaleLinear()
      .domain([0, max] as number[])
      .nice()
      .range([chartHeight - margin.bottom, margin.top]);

    const valueLine = d3
      .line<IntensityData>()
      .x((d) => x(new Date(d.datetime)))
      .y((d) => y(d.carbon_intensity));

    const area = d3
      .area<IntensityData>()
      .x((d) => x(new Date(d.datetime)))
      .y0(chartHeight - 15)
      .y1((d) => y(d.carbon_intensity));

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      // Allow resizing of chart
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      // Add group element and move it to the top left
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add x axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${chartHeight - margin.bottom} )`)
      .call(d3.axisBottom(x));

    // Add y axis
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    // Add label for y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "y-label")
      .attr("y", 0 - margin.left - 80)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Carbon Intensity (tons per gwh)");

    // Draw x axis
    svg
      .select(".x.axis") // set the x-axis
      .transition()
      .duration(750);

    // Draw y axis
    svg
      .select(".y.axis") // set the y-axis
      .transition()
      .duration(750);

    // Add area path
    // Paths are determined by d attribute
    const areaPath = svg
      .append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area);

    const linePath = svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueLine);

    const pathLength = linePath!.node()!.getTotalLength() ?? 0;

    linePath
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-width", 3)
      .transition()
      .duration(1000)
      .attr("stroke-width", 0)
      .attr("stroke-dashoffset", 0);
  }, [chartRef, data, height, width, max]);

  return <svg className="mx-auto w-[900px] h-[500px]" ref={chartRef}></svg>;
};

export default LineChart;
