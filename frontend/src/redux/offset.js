import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    postOffSet: 0,
    pollOffSet: 0,
  },
};

export const offsetState = createSlice({
  name: "offset",
  initialState,
  reducers: {
    setPostOffset: (state, action) => {
      state.value.postOffSet += action.payload;
      console.log(state.value);
      
    },
    setPollOffset: (state, action) => {
      state.value.pollOffSet += action.payload;
      console.log(state.value);
      
    },
    clearOffset: (state) => {
      state.value.postOffSet=0;
      state.value.pollOffSet=0;
    },
  },
});

export const {setPostOffset, setPollOffset, clearOffset} = offsetState.actions;

export default offsetState.reducer;