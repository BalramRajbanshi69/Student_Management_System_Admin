import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { CiTrash } from "react-icons/ci";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { deleteStudent, fetchStudents } from "../../../store/studentSlice";
import StudentPic from "../../../.././src/images/student/araniko.jpg";
import toast from "react-hot-toast";

export default function BasicTableOne() {
  const dispatch = useAppDispatch();
  const { students} = useAppSelector((state) => state.student);
  const {searchTerm} = useAppSelector((state)=>state.search)
  // console.log("students",students);

  const filteredSearchStudents = students?.filter(
    (student) =>
      student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Include search by ID and age
      student?._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Convert age to a string for searching
      String(student?.age).includes(searchTerm)
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleStudentDelete = (studentId: string) => {
    dispatch(deleteStudent(studentId));
    toast.success("Student deleted successfully");
  };

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
                Course
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
            {filteredSearchStudents?.map((student) => (
              <TableRow key={student._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={student?.image?.[0] || StudentPic} // Ensure this points to the correct image URL
                        alt={student?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {student?.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {student?._id}
                </TableCell>
                <TableCell className="px-6 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {student?.age}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {student?.email}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {student?.course}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button
                    className=" p-2  font-semibold"
                    onClick={() => handleStudentDelete(student._id)}
                  >
                    <CiTrash color="red" size={20} />
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
