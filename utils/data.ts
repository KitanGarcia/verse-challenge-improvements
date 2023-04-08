import { IntensityData } from "../types/IntensityData";
import { OrganizedData } from "../types/OrganizedData";

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

// Filters out bad data, removes duplicates,
// filters data only pertinent to a specified year,
// and calculates absolute and relative min and max
// NOTE: When removing duplicates, it removes subsequent elements with the same date as the first
// Even if the values are different!
export const organizeData = (
  sortedData: IntensityData[],
  filterYear: number
) => {
  const allData: IntensityData[] = [];
  const yearData: IntensityData[] = [];
  let max = 0;
  let min = 0;
  let relativeMax = 0;
  let relativeMin = 0;

  // Sort data to more easily find duplicates
  // ASSUME DATA IS SORTED. The below, works, but I ran out of time for a better solution
  /*
  const sorted = data;
    .sort(function (a, b) {
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    })
    .reverse();
    */
  for (let i = 0; i < sortedData.length; i++) {
    if (
      // Only add good data
      sortedData[i] &&
      sortedData[i].datetime &&
      typeof sortedData[i].datetime === "string" &&
      sortedData[i].carbon_intensity &&
      typeof sortedData[i].carbon_intensity === "number" &&
      // RemoveDuplicates
      sortedData[i - 1] &&
      sortedData[i].datetime !== sortedData[i - 1].datetime
    ) {
      allData.push(sortedData[i]);

      if (max < sortedData[i].carbon_intensity) {
        max = sortedData[i].carbon_intensity;
      }

      if (min > sortedData[i].carbon_intensity) {
        min = sortedData[i].carbon_intensity;
      }
    }

    if (
      filterYear &&
      sortedData[i].datetime &&
      new Date(sortedData[i].datetime).getUTCFullYear() === filterYear
    ) {
      yearData.push(sortedData[i]);

      if (relativeMax < sortedData[i].carbon_intensity) {
        relativeMax = sortedData[i].carbon_intensity;
      }

      if (relativeMin > sortedData[i].carbon_intensity) {
        relativeMin = sortedData[i].carbon_intensity;
      }
    }
  }

  return {
    allData,
    yearData,
    absoluteMax: max,
    absoluteMin: min,
    relativeMax,
    relativeMin,
  } as OrganizedData;
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
// NOTE: This removes subsequent elements with the same date as the first
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
