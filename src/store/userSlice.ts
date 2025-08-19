import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../misc/statuses";
import { APIAuthenticated } from "../http";


interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserState {
  users: User[] | null;
  status: string;
}

type AppDispatch = Dispatch<any> | ((action: any) => any);

const initialState: UserState = {
  users: null,
  status: STATUSES.SUCCESS ,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    deleteUserById(state, action: PayloadAction<{ userId: string }>) {
      if (state.users) {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
      }
    },
  },
});


// --- Action Creators and Reducer Export ---
export const { setStatus, setUsers, deleteUserById } = userSlice.actions;
export default userSlice.reducer;


export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/users");
    // const response = await APIAuthenticated.get<{ data: User[] }>("/users");
      dispatch(setUsers(response.data.data.reverse()));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.error("Failed to fetch users:", error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deleteUser(userId: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING ));
    try {

      await APIAuthenticated.delete(`/users/${userId}`);
      // Dispatch the action to remove the user from the Redux state.
      dispatch(deleteUserById({ userId }));
      dispatch(setStatus(STATUSES.SUCCESS ));
    } catch (error) {
      console.error("Failed to delete user:", error);
      dispatch(setStatus(STATUSES.ERROR ));
    }
  };
}
