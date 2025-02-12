import { createContext } from "react";
import { PageMode } from "./types";

export interface PageState {
  mode: PageMode;
}

export const defaultPageState: PageState = {
  mode: PageMode.Normal,
};

interface PageContextValue extends PageState {
  setState: (state: PageState) => void;
}

const PageContext = createContext<PageContextValue>({
  ...defaultPageState,
  setState: () => {},
});

export default PageContext;
