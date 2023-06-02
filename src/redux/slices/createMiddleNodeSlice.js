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
    setCreateMiddleNodeSlice: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    updateCreateMiddleNodeSlice: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setCreateMiddleNodeSlice, updateCreateMiddleNodeSlice } = createMiddleNodeSlice.actions;
export default createMiddleNodeSlice.reducer;
