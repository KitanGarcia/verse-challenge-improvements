import { DataField } from "./DataField";
import { IntensityData } from "./IntensityData";

export type WholeData = {
  schema: {
    fields: DataField[];
  };
  data: IntensityData[];
};
