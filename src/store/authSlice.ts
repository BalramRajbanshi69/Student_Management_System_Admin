import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { STATUSES } from "../misc/statuses";
import { API, APIAuthenticated } from "../http";

// Define a type for your user data
interface User {
    id: string; // Assuming user has an ID
    role: string;
    // Add other user properties like name, email, etc., here
}

// Define the type for the auth state
interface AuthState {
    data: User | null;
    status: string; // The status string from STATUSES
    token: string | null;
}

const initialState: AuthState = {
    data: null,
    status: STATUSES.SUCCESS,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducers are pure and synchronous, so no api calls
        setUser(state, action: PayloadAction<User>) {
            state.data = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        logOut(state) {
            state.data = null;
            state.token = null;
            state.status = STATUSES.SUCCESS;
        }
    }
});

// Infer the `AppDispatch` type from the store itself
type AppDispatch = Dispatch<any>

export const { setUser, setStatus, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;

// login thunk middleware
export function loginUser(data: { email: string, password: string }) {
    return async function loginUserThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.post("/auth/login", data);
            console.log(response.data);
            
            // Assuming response.data has the structure { data: User, token: string }
            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token));
            dispatch(setStatus(STATUSES.SUCCESS));

            return response.data;
        } catch (error: any) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    };
}

// fetch profile
export function fetchProfile() {
    return async function fetchProfileThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/profile/");
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
