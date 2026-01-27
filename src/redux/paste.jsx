import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      state.pastes.push(paste);

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      );

      toast.success("Paste created successfully ✅");
    },

    updateToPaste: (state, action) => {
      const { id, content } = action.payload;
      const index = state.pastes.findIndex(p => p.id === id);

      if (index !== -1) {
        state.pastes[index].content = content;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated ✨");
      }
    },

    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      const index=state.pastes.findIndex((item)=>
      item._id === pasteId);
      if(index >=0){
        state.pastes.splice(index,1);
         localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted 🗑️");
      }
    },

    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared 🔥");
    },
  },
});

export const {
  addToPastes,
  updateToPaste,
  resetAllPaste,
  removeFromPaste,
} = pasteSlice.actions;

export default pasteSlice.reducer;
