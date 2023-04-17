import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../main";
import { TypedUseSelectorHook } from "react-redux";

//CREATE CUSTOM HOOKS FOR USESELECTOR AND USEDISPATCH
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
