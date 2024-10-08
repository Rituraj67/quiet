import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomInfo:null,
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomDetail:(state,action)=>{
        state.roomInfo = action.payload
    },

    changeBgImg:(state,action)=>{
      state.roomInfo.bgImg = action.payload
    },
    changeDpImg:(state,action)=>{
      state.roomInfo.img = action.payload
    },
    changeTitle:(state,action)=>{
      state.roomInfo.title = action.payload
    },
    decreaseRoomPost:(state)=>{
      state.roomInfo._count.posts -= 1;
    },
    decreaseRoomPolls:(state)=>{
      state.roomInfo._count.polls -= 1;
    },
    clearRoomDetail:(state)=>{
      state.roomInfo=null;
    },
  },
})

export const { setRoomDetail,changeBgImg,clearRoomDetail, changeDpImg,changeTitle,decreaseRoomPost,decreaseRoomPolls } = roomSlice.actions;

export default roomSlice.reducer