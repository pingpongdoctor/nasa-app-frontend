import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//DEFINE THE DATA TYPE FOR THE ACCESS TOKEN INITIAL STATE
interface InitialStateType {
  value: string;
}

//DEFINE THE INITIAL STATE FOR THE ACCESS TOKEN
const initialState: InitialStateType = {
  value: "",
};

//DEFINE THE ACCESS TOKEN SLICE
const accessTokenSlice = createSlice({
  name: "access-token",
  initialState,
  reducers: {
    //FUNCTION TO UPDATE THE STATE OF THE ACCESS TOKEN
    updateAccessToken(state: InitialStateType, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { updateAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
