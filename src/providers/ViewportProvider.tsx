import React from "react";
import { IDimensions } from "../lib/LoideInterfaces";

export const viewportContext = React.createContext<IDimensions>({
  width: 0,
  height: 0,
});

type ViewportProviderProps = {
  children?: React.ReactNode;
};

export const ViewportProvider: React.FC<ViewportProviderProps> = ({ children }) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [height, setHeight] = React.useState<number>(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};
