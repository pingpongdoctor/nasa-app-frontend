import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//DATA TYPE OF THE INITIAL LOGIN STATE
interface initialStateType {
  value: boolean;
}
//DEFINE THE INITIAL LOGIN STATE
const initialState: initialStateType = { value: false };
//DEFINE THE LOGIN SLICE
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //FUNCTION TO UPDATE THE LOGIN STATE
    updateLoginState<T>(
      state: initialStateType,
      action: PayloadAction<boolean>
    ): void {
      state.value = action.payload;
    },
  },
});

export const { updateLoginState } = loginSlice.actions;
export default loginSlice.reducer;
