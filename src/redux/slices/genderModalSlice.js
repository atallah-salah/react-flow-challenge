import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  isCreateNode: false,
  creationType: "",
  nodeName: "",
  genderName: "",
  data: {},
};

export const genderModalSlice = createSlice({
  name: "genderModal",
  initialState,
  reducers: {
    updateGenderModalState: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    clearGenderModalState: () => initialState,
  },
});

export const { clearGenderModalState, updateGenderModalState } = genderModalSlice.actions;
export default genderModalSlice.reducer;
