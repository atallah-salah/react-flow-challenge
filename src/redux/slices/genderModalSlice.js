import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  modalCallback: () => {},
};

export const genderModalSlice = createSlice({
  name: "genderModal",
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

export const { setState, updateState } = genderModalSlice.actions;
export default genderModalSlice.reducer;
