import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import studentReducer from "./studentSlice"
import teacherReducer from "./teacherSlice"
import searchReducer from "./searchSlice"
import dataReducer from "./allDataSlice"
import userReducer from "./userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    teacher:teacherReducer,
    search:searchReducer,
    data:dataReducer,
    user:userReducer
  },
});

// This is where RootState is defined and exported
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;