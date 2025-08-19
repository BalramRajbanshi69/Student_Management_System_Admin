import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { STATUSES } from "../misc/statuses";
import { APIAuthenticated } from "../http";

// Define the structure of a single teacher object
 interface Teacher {
  _id: string;
  teacherName: string;
  teacherEmail: string;
  teacherAge: number;
  teacherAddress: string;
  teacherSubject: string[];
  teacherImage?: string;
}

// Define the shape of the teacher slice state
interface TeacherState {
  teachers: Teacher[] | null;
  status: string; // The status string from STATUSES
}

// Define a type for the thunk's dispatch function
type AppDispatch = Dispatch<any> | ((action: any) => any);

const initialState: TeacherState = {
  teachers: null,
  status: STATUSES.SUCCESS,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeachers(state, action: PayloadAction<Teacher[]>) {
      state.teachers = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    deleteTeacherById(state, action: PayloadAction<{ teacherId: string }>) {
      if (state.teachers) {
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === action.payload.teacherId
        );
        if (index !== -1) {
          state.teachers.splice(index, 1);
        }
      }
    },
    addTeachers(state, action: PayloadAction<Teacher>) {
      if (state.teachers) {
        state.teachers.push(action.payload);
      } else {
        state.teachers = [action.payload];
      }
    },
    updateTeachers(state, action: PayloadAction<Teacher>) {
      if (state.teachers) {
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === action.payload._id
        );
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      }
    },
   
  },
});

export const { setTeachers, setStatus, deleteTeacherById, addTeachers, updateTeachers } =
  teacherSlice.actions;
export default teacherSlice.reducer;

// Fetch all teachers
export function fetchTeachers() {
  return async function fetchTeachersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/teachers/");
      dispatch(setTeachers(response.data.data.reverse()));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error: any) {
      console.error("Error fetching teachers:", error);
      dispatch(setStatus(STATUSES.ERROR));
      throw error;
    }
  };
}

// Add a new teacher
export function addTeacher(data: FormData) {
  return async function addTeacherThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/teachers/", data);
      // console.log("Add teacher response:", response.data);
      dispatch(addTeachers(response.data.data)); // Assuming response.data.data is the newly added teacher
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error: any) {
      console.error("Error adding teacher:", error);
      dispatch(setStatus(STATUSES.ERROR));
      throw error;
    }
  };
}

// Delete teacher by ID
export function deleteTeacher(teacherId: string) {
  return async function deleteTeacherThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await APIAuthenticated.delete(`/teachers/${teacherId}`);
      dispatch(deleteTeacherById({ teacherId}));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error: any) {
      console.error("Error deleting teacher:", error);
      dispatch(setStatus(STATUSES.ERROR));
      throw error;
    }
  };
}

// Update teacher by ID
export function updateTeacher(data: FormData, teacherId: string) {
  return async function updateTeacherThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.patch(`/teachers/${teacherId}`, data);
      dispatch(updateTeachers(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error: any) {
      console.error("Error updating teacher:", error);
      dispatch(setStatus(STATUSES.ERROR));
      throw error;
    }
  };
}