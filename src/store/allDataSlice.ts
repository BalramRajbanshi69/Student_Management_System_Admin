import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../misc/statuses";
import { APIAuthenticated } from "../http";



interface AllData {
  [key: string]: any;
}

// Define the shape of the slice's state
interface DataState {
  data: AllData;
status: string; 
}

// Define a type for the thunk's dispatch function
type AppDispatch = Dispatch<any> | ((action: any) => any);

const initialState: DataState = {
  data: {},
  status: STATUSES.SUCCESS,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDatas(state, action: PayloadAction<AllData>) {
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export const { setDatas, setStatus } = dataSlice.actions;

export default dataSlice.reducer;


export function fetchAllData() {
  return async function fetchAllDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
    const response = await APIAuthenticated.get("/all/datas")
      dispatch(setDatas(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
