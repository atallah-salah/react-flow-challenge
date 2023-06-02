import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  modalCallback: () => {},
};

export const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    updateDeleteModalState: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { updateDeleteModalState } = deleteModalSlice.actions;
export default deleteModalSlice.reducer;
