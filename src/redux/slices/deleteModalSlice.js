import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  modalCallback: () => {},
};

export const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    setDeleteModalState: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    updateDeleteModalState: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setDeleteModalState, updateDeleteModalState } = deleteModalSlice.actions;
export default deleteModalSlice.reducer;
