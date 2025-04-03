// flowchart.selector.ts
import { RootState } from "../../store";

export const selectFlowchartNodes = (state: RootState) => {
  return state.flowchart.nodes;
};
export const selectFlowchartLoading = (state: RootState) =>
  state.flowchart.loading;
export const selectFlowchartError = (state: RootState) => state.flowchart.error;
