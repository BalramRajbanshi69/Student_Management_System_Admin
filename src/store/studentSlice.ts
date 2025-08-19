import { createSlice,PayloadAction,Dispatch } from "@reduxjs/toolkit";
import { STATUSES } from "../misc/statuses";
import { APIAuthenticated } from "../http";




// Define the structure of a single student object
interface Student {
    _id: string; // Assuming a unique ID is provided by the server
    name: string;
    age: number;
    email: string;
    course: string;
    image?: string; // Optional URL for the student's photo
    // Add any other properties your student data has
}

// Define the shape of the student slice state
interface StudentState {
    students: Student[] | null;
    status: string; // The status string from STATUSES
    
}

// Define a type for the thunk's dispatch function
type AppDispatch = Dispatch<any> | ((action: any) => any);

const initialState: StudentState = {
    students: null,
    status: STATUSES.SUCCESS,
};

const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setStudents(state, action: PayloadAction<Student[]>) {
            state.students = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
         deleteStudentById(state, action: PayloadAction<{ studentId: string }>) {
            if (state.students) {
                const index = state.students.findIndex((student) => student._id === action.payload.studentId);
                if (index !== -1) {
                    state.students.splice(index, 1);
                }
            }
        },

        addStudents(state, action: PayloadAction<Student>) {
            if (state.students) {
                state.students.push(action.payload);
            } else {
                state.students = [action.payload];
            }
        },

         updateStudents(state, action: PayloadAction<Student>) {
      if (state.students) {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      }
    },

    
        
    }
})


export const {setStudents,setStatus,deleteStudentById,addStudents,updateStudents} = studentSlice.actions
export default studentSlice.reducer







// fetch your all order
// fetch all students
export function fetchStudents() {
    return async function fetchStudentsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/students/");
            // Assuming response.data.data is an array of student objects
            dispatch(setStudents(response.data.data.reverse()));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}


// add a new student
export function addStudent(data: FormData) {
    return async function addStudentThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            // Note: Axios automatically sets "Content-Type" to "multipart/form-data" for FormData
            const response = await APIAuthenticated.post("/students/", data);
            
            // console.log(response.data);
            dispatch(addStudents(response.data.data)); // Assuming response.data.data is the newly added student object
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    };
}

// delete student by ID (admin)
export function deleteStudent(studentId: string) {
    return async function deleteStudentThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            await APIAuthenticated.delete(`/students/${studentId}`);
            dispatch(deleteStudentById({ studentId }));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    };
}



export function updateStudent(data:FormData,studentId:string){
    return async function updateStudentThunk(dispatch:AppDispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/students/${studentId}`,data)
            dispatch(updateStudents(response.data.data))            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}

