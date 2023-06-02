import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  modalCallback: () => {},
};

export const genderModalSlice = createSlice({
  name: "genderModal",
  initialState,
  reducers: {
    setGenderModalState: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    updateGenderModalState: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setGenderModalState, updateGenderModalState } = genderModalSlice.actions;
export default genderModalSlice.reducer;
