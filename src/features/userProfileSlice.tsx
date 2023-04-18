import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//ANNOTATE DATA TYPE FOR THE INITIAL USER PROFILE STATE
interface InitialStateType {
  value: { id: number; name: string } | null;
}
//DEFINE THE INITIAL STATE FOR THE USER PROFILE
const initialState: InitialStateType = { value: null };
//DEFINE USER PROFILE SLICE
const userProfileSlice = createSlice({
  name: "user-profile",
  initialState,
  reducers: {
    updateUserProfile(
      state: InitialStateType,
      action: PayloadAction<{ id: number; name: string } | null>
    ): void {
      state.value = action.payload;
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
