import { IntensityData } from "../types/IntensityData";

// Given a date, outputs the number of days into the year
// Ie. Jan 3 => 3
export const daysIntoYear = (date: Date) => {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

// Filters out data if a field is undefined or the wrong type
export const cleanData = (data: IntensityData[]) => {
  let result = data.filter(
    (datum) =>
      datum !== undefined &&
      datum.datetime &&
      typeof datum.datetime === "string" &&
      datum.carbon_intensity &&
      typeof datum.carbon_intensity === "number"
  );
  return result;
};

// Remove duplicate dates
// NOTE: This subsequent elements with the same date as the first
// Even if the values are different!
export const removeDuplicates = (data: IntensityData[]) => {
  return data.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.datetime === value.datetime)
  );
};

// Returns data only pertinent to a specified year
export const filterYear = (data: IntensityData[], year: number) => {
  const result = data.filter(
    (datum) =>
      datum.datetime && new Date(datum.datetime).getUTCFullYear() === year
  );
  return result;
};
