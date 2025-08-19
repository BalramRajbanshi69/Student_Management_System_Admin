// import { Controller, useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { updateStudent } from "../../store/studentSlice";
// import toast from "react-hot-toast";

// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import { EnvelopeIcon } from "../../icons";
// import Select from "../../components/form/Select";
// import FileInput from "../../components/form/input/FileInput";
// import InputField from "../../components/form/input/InputField";


// interface Student {
//   _id: string;
//   name: string;
//   age: number;
//   email: string;
//   course: string;
//   image?: string[];
//   status?: "Active" | "Pending" | "Inactive";
// }

// interface StudentFormInputs {
//   name: string;
//   age: number;
//   email: string;
//   course: string;
//   image: FileList;
// }

// interface EditStudentProps {
//   isOpen: boolean;
//   onClose: () => void;
//   studentToEdit: Student | null;
// }

// export default function EditStudent({ isOpen, onClose, studentToEdit }: EditStudentProps) {
//   const dispatch = useAppDispatch();
//   const { status } = useAppSelector((state) => state.student);

//   const options = [
//     { value: "web development", label: "Web Development" },
//     { value: "computer science", label: "Computer Science" },
//     { value: "software engineering", label: "Software Engineering" },
//     { value: "data science", label: "Data Science" },
//     { value: "artificial intelligence", label: "Artificial Intelligence" },
//     { value: "cybersecurity", label: "Cybersecurity" },
//     { value: "mobile app development", label: "Mobile App Development" },
//     { value: "network engineering", label: "Network Engineering" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     reset,
//   } = useForm<StudentFormInputs>({
//     defaultValues: {
//       name: "",
//       age: undefined,
//       email: "",
//       course: "",
//       image: undefined,
//     },
//   });

//   useEffect(() => {
//     if (studentToEdit) {
//       reset({
//         name: studentToEdit.name,
//         age: studentToEdit.age,
//         email: studentToEdit.email,
//         course: studentToEdit.course,
//         image: undefined, // File input cannot be pre-filled
//       });
//     }
//   }, [studentToEdit, reset]);

//   const handleStudentUpdate = async (data: StudentFormInputs) => {
//     if (!studentToEdit) return;
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("age", data.age.toString());
//       formData.append("email", data.email);
//       formData.append("course", data.course);
//       if (data.image && data.image.length > 0) {
//         formData.append("image", data.image[0]);
//       }

//       await dispatch(updateStudent(studentToEdit._id, formData));
//       toast.success("Student updated successfully!");
//       onClose();
//     } catch (error: any) {
//       console.error("Error updating student:", error);
//       toast.error(error.message || "Failed to update student. Please try again!");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
//       {/* Overlay */}
//       <div
//         aria-hidden="true"
//         className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
//         onClick={onClose}
//       ></div>

//       {/* Modal */}
//       <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
//         <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
//           <button
//             type="button"
//             className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
//             onClick={onClose}
//           >
//             <svg
//               title="Close"
//               className="h-4 w-4 hover:rotate-180 transition-all ease-in-out duration-500 cursor-pointer text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             <span className="sr-only">Close</span>
//           </button>

//           <ComponentCard title="Edit Student Information">
//             <form onSubmit={handleSubmit(handleStudentUpdate)} noValidate>
//               <div className="space-y-4 p-2">
//                 <div>
//                   <Label htmlFor="name">Name<span className="text-red-600 inline-block p-1 text-sm">*</span></Label>
//                   <InputField
//                     type="text"
//                     id="name"
//                     error={errors.name}
//                     className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
//                     placeholder="Full Name"
//                     {...register("name", { required: "Name is required" })}
//                   />
//                   {errors.name && (
//                     <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="age">Age<span className="text-red-600 inline-block p-1 text-sm">*</span></Label>
//                   <InputField
//                     type="number"
//                     id="age"
//                     error={errors.age}
//                     className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
//                     placeholder="Age"
//                     {...register("age", {
//                       required: "Age is required",
//                       min: { value: 16, message: "Student must be at least 16 years old" },
//                       valueAsNumber: true,
//                     })}
//                   />
//                   {errors.age && (
//                     <span className="text-red-500 text-xs mt-1">{errors.age.message}</span>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email<span className="text-red-600 inline-block p-1 text-sm">*</span></Label>
//                   <div className="relative">
//                     <InputField
//                       type="email"
//                       id="email"
//                       error={errors.email}
//                       className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full pl-[62px]"
//                       placeholder="info@gmail.com"
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: {
//                           value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
//                           message: "Enter a valid email address",
//                         },
//                       })}
//                     />
//                     <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
//                       <EnvelopeIcon className="size-6" />
//                     </span>
//                     {errors.email && (
//                       <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="course">Course<span className="text-red-600 inline-block p-1 text-sm">*</span></Label>
//                   <Controller
//                     control={control}
//                     name="course"
//                     rules={{ required: "Course is required" }}
//                     render={({ field }) => (
//                       <Select
//                         options={options}
//                         placeholder="Select a Course"
//                         className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
//                         {...field}
//                       />
//                     )}
//                   />
//                   {errors.course && (
//                     <span className="text-red-500 text-xs mt-1">{errors.course.message}</span>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="image">Upload Image (optional)</Label>
//                   {studentToEdit?.image?.[0] && (
//                     <div className="mb-2">
//                       <Label>Current Image</Label>
//                       <img
//                         src={studentToEdit.image[0]}
//                         alt="Current student"
//                         className="w-20 h-20 object-cover rounded"
//                       />
//                     </div>
//                   )}
//                   <Controller
//                     control={control}
//                     name="image"
//                     render={({ field: { onChange, ref } }) => (
//                       <FileInput
//                         onChange={(e) => {
//                           console.log("FileInput selected:", e.target.files);
//                           onChange(e.target.files);
//                         }}
//                         ret={ref}
//                         className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
//                         accept="image/jpeg,image/png,image/jpg"
//                       />
//                     )}
//                   />
//                   {errors.image && (
//                     <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>
//                   )}
//                 </div>
//                 <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))] pt-2">
//                   <button
//                     type="button"
//                     className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
//                     onClick={onClose}
//                     disabled={status === "loading"}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-[#4d1b80] hover:bg-[#7127BA] focus:bg-[#11071F] focus:ring-offset-[#11071F]"
//                     disabled={status === "loading"}
//                   >
//                     {status === "loading" ? "Updating..." : "Update"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </ComponentCard>
//         </div>
//       </div>
//     </div>
//   );
// }