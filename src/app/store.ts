import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { myProfileQuery_myProfile_user } from "__generated__/myProfileQuery";

interface loggedInUserState {
  value: myProfileQuery_myProfile_user | null | undefined;
}

const initialState: loggedInUserState = {
  value: null,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<myProfileQuery_myProfile_user>) => {
      state.value = action.payload;
    },
    logout: (state, action: PayloadAction<null>) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout } = loggedInUserSlice.actions;

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
