import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//DATA TYPE OF THE INITIAL AUTHENTICATING STATE
interface InitialStateType {
  value: boolean;
}
//DEFINE THE INITIAL AUTHENTICATING STATE
const initialState: InitialStateType = { value: true };
//DEFINE THE AUTHENTICATING SLICE
const authenticatingSlice = createSlice({
  name: "authenticating",
  initialState,
  reducers: {
    //FUNCTION TO UPDATE THE AUTHENTICATING STATE
    updateAuthenticatingState<T>(
      state: InitialStateType,
      action: PayloadAction<boolean>
    ): void {
      state.value = action.payload;
    },
  },
});

export const { updateAuthenticatingState } = authenticatingSlice.actions;
export default authenticatingSlice.reducer;
