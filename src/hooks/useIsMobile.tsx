import React from "react";
import { screenBreakpoints } from "../lib/constants";
import { IDimensions } from "../lib/LoideInterfaces";
import { viewportContext } from "../providers/ViewportProvider";

export const useIsMobile = (): boolean => {
  const dim: IDimensions = React.useContext(viewportContext);
  return dim.width < screenBreakpoints.small;
};
