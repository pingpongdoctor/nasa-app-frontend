import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//DATA TYPE OF THE INITIAL LOGIN STATE
interface InitialStateType {
  value: boolean;
}
//DEFINE THE INITIAL LOGIN STATE
const initialState: InitialStateType = { value: false };
//DEFINE THE LOGIN SLICE
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //FUNCTION TO UPDATE THE LOGIN STATE
    updateLoginState<T>(
      state: InitialStateType,
      action: PayloadAction<boolean>
    ): void {
      state.value = action.payload;
    },
  },
});

export const { updateLoginState } = loginSlice.actions;
export default loginSlice.reducer;
