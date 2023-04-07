import { IntensityData } from "./IntensityData";

export type OrganizedData = {
  allData: IntensityData[];
  yearData: IntensityData[];
  absoluteMax: number;
  absoluteMin: number;
  relativeMax: number;
  relativeMin: number;
};
