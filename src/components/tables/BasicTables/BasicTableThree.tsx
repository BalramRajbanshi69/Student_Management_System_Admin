import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  Table,
    TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { deleteUser, fetchUsers } from "../../../store/userSlice";
import { CiTrash } from "react-icons/ci";
import toast from "react-hot-toast";

export default function BasicTableThree() {
      const dispatch = useAppDispatch()
    const {users} = useAppSelector((state)=>state.user)
    console.log("users",users);
    const {searchTerm} = useAppSelector((state)=>state.search)
    

    useEffect(()=>{
        dispatch(fetchUsers())
    },[])




   const filteredSearchUsers = users?.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // New: Check if the search term matches the user's formatted registration date.
      (user?.createdAt && new Date(user.createdAt).toLocaleDateString().includes(searchTerm))
  );


  const handleUserDelete = (userId: string) => {
    dispatch(deleteUser(userId));
    toast.success("User deleted successfully");
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
                S.N
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900  text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-bold  text-gray-900 text-start text-theme-xs dark:text-gray-400"
              >
                Name
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
                Registered At
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
             {filteredSearchUsers?.map((user,index) => (
              <TableRow key={user._id}>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {user?._id}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {user?.name}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {user?.email}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-gray-400">
                  {new Date(user?.createdAt).toLocaleDateString()} 
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button
                    className=" p-2  font-semibold"
                    onClick={() => handleUserDelete(user._id)}
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
