import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  createNode: false,
  data: {},
};

export const createMiddleNodeSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    updateCreateMiddleNodeSlice: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { updateCreateMiddleNodeSlice } = createMiddleNodeSlice.actions;
export default createMiddleNodeSlice.reducer;
