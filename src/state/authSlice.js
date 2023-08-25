import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  menus: [],
  qr: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.qr = action.payload.qr;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.menus = [];
      state.qr = null;
    },
    setMenus: (state, action) => {
      state.menus = action.payload.menus;
    },
  },
});

export const { setLogin, setLogout, setMenus } = authSlice.actions;
export default authSlice.reducer;
