import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
import nodesSlice from "./slices/NodesSlice";
import genderModalSlice from "./slices/genderModalSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    nodes: nodesSlice,
    genderModal: genderModalSlice,
  },
});
