import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: "0",
      type: "input",
      data: { label: "ME" },
      position: { x: 0, y: 50 },
    },
    { id: "node-1", type: "GenderNode", position: { x: 0, y: 0 }, data: { value: 123 } },
  ],
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    updateNodes: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    addNewNode: (state, action) => {
      state = { ...state, nodes: [...state.nodes, action.payload] };
      return state;
    },
  },
});

export const { setNodes, updateNodes, addNewNode } = nodesSlice.actions;
export default nodesSlice.reducer;
