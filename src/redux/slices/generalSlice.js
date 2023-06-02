import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setState: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    updateState: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setState, updateState } = generalSlice.actions;
export default generalSlice.reducer;
