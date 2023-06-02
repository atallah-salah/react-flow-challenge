import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
import nodesSlice from "./slices/NodesSlice";
import genderModalSlice from "./slices/genderModalSlice";
import deleteModalSlice from "./slices/deleteModalSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    nodes: nodesSlice,
    genderModal: genderModalSlice,
    deleteModal: deleteModalSlice,
  },
});
