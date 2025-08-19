import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteTeacher, fetchTeachers } from "../../../store/teacherSlice";


import TeacherPic from "../../../.././src/images/student/araniko.jpg"
import toast from "react-hot-toast"
import { CiTrash } from "react-icons/ci";




export default function BasicTableTwo() {
  const dispatch = useAppDispatch()
  const {teachers} = useAppSelector((state)=>state.teacher)
  const {searchTerm} = useAppSelector((state)=>state.search)
  // console.log("teachers",teachers);


 const filteredTeacherSearch = teachers?.filter((teacher)=>
 teacher._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
 teacher.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
 teacher.teacherAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
 teacher.teacherEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
 teacher.teacherSubject.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
 String(teacher?.teacherAge).includes(searchTerm)
)

  

  useEffect(()=>{
    dispatch(fetchTeachers())
  },[])


  const handleTeacherDelete = (teacherId:string)=>{
    dispatch(deleteTeacher(teacherId))
    toast.success("Teacher deleted successfully")
  }

  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow className="uppercase">
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900  text-start text-theme-xs dark:text-gray-400"
              >
                Profile
              </TableCell>
              
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Age
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Subject
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Address
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]"> 
             {filteredTeacherSearch?.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                     <img
    width={40}
    height={40}
    src={teacher?.teacherImage?.[0] || TeacherPic } // Ensure this points to the correct image URL
    alt={teacher?.teacherName}
    className="w-full h-full object-cover"
/>

                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {teacher?.teacherName}
                      </span>
                     
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {teacher?._id}
                </TableCell>
                <TableCell className="px-6 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {teacher?.teacherAge}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {teacher?.teacherEmail}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {teacher?.teacherSubject}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {teacher?.teacherAddress}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button className=" p-2  font-semibold" onClick={()=>handleTeacherDelete(teacher._id)}>
                    <CiTrash color="red" size={20}/>
                  </button>
                </TableCell>
                
                
              
              </TableRow>
            ))}
           </TableBody> 
        </Table>
      </div>
     
    </div>
  );
}
