import { scale } from "chroma-js";
import colors from "../../colors";

export const getGradientBackgroundColor = (percentage: number) => {
  const colorScale = scale([colors["base-01"], colors["primary-04"]]);
  return colorScale(percentage).hex();
};

export const getGradientTextColor = (percentage: number) => {
  const colorScale = scale([colors["subtle-03"], colors["primary-07"]]);
  return colorScale(percentage).hex();
};
