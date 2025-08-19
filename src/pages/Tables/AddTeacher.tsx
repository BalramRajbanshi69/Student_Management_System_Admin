import toast from "react-hot-toast";
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router";
import { addTeacher } from "../../store/teacherSlice";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../../src/components/form/input/InputField";
import { EnvelopeIcon } from "../../icons";
import Select from "../../components/form/Select";
import FileInput from "../../components/form/input/FileInput";

const AddTeacher = () => {
   const dispatch = useAppDispatch();
  const navigate = useNavigate()
     const options = [
    { value: "web development", label: "Web Development" },
    { value: "computer science ", label: "Computer Science" },
    { value: "software engineering", label: "Software Engineering" },
    { value: "data science", label: "Data Science" },
    { value: "artificial intelligence", label: "Artificial Intelligence" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "mobile app development", label: "Mobile App Development" },
    { value: "network engineering", label: "Network Engineering" },
  ];

  // Define the interface for the form data
interface TeacherFormInputs {
    teacherName: string;
    teacherAge: number;
    teacherEmail: string;
    teacherAddress: string;
    teacherSubject: string;
    teacherImage: FileList;
}

    const { register, handleSubmit, formState: { errors },control,reset } = useForm<TeacherFormInputs>();
   

    const handleTeacherSubmit = async (data: TeacherFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("teacherName", data.teacherName);
      formData.append("teacherAge", data.teacherAge.toString());
      formData.append("teacherEmail", data.teacherEmail);
      formData.append("teacherAddress", data.teacherAddress);
      formData.append("teacherSubject", data.teacherSubject);

      // Log file selection
      console.log("Selected files:", data.teacherImage);
      if (data.teacherImage && data.teacherImage.length > 0) {
        formData.append("teacherImage", data.teacherImage[0]);
        console.log("File name:", data.teacherImage[0].name);
      } else {
        throw new Error("Image is required!");
      }

      // Log FormData contents
      console.log("FormData contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

     await dispatch(addTeacher(formData));
      // console.log("Add student response:", response);
      toast.success("Teacher added successfully!");
      reset();
      navigate("/all-teachers");
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast.error(error.message || "Failed to add student. Please try again!");
    }
  };

  return (
    <div>
        <PageMeta
        title="React.js Basic Tables Dashboard | Admin SMS- Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for Admin SMS- React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Add Teacher" />
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-xl">
          <ComponentCard title="Teacher Information">
     <form onSubmit={handleSubmit(handleTeacherSubmit)}>
       <div className="space-y-6">
        <div>
          <Label htmlFor="teacherName">Teacher Name</Label>
          <Input type="text" id="teacherName"  error={errors.teacherName}
                            {...register("teacherName", {
                                required: "TeacherName is required",
                            })}/>
                            {errors.teacherName && (
                            <span className="text-red-500 text-xs mt-1">{errors.teacherName.message}</span>
                        )}
        </div>
        <div>
          <Label htmlFor="teacherAge">Teacher Age</Label>
          <Input type="number" id="teacherAge" error={errors.teacherAge}
                            {...register("teacherAge", {
                                required: "TeacherAge is required",
                                min: {
                                    value: 16,
                                    message: "teacherAge must be at least 16 years old"
                                }
                            })} />
                            {errors.teacherAge && (
                            <span className="text-red-500 text-xs mt-1">{errors.teacherAge.message}</span>
                        )}
        </div>
         <div>
          <Label>Teacher Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="email"
               error={errors.teacherEmail}
                            {...register("teacherEmail", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
              className="pl-[62px]"
              
            />
            {errors.teacherEmail && (
                            <span className="text-red-500 text-xs mt-1">{errors.teacherEmail.message}</span>
                        )}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="teacherAddress">Teacher Address</Label>
          <Input type="text" id="teacherAddress"  error={errors.teacherAddress}
                            {...register("teacherAddress", {
                                required: "TeacherAddress is required",
                            })}/>
                            {errors.teacherAddress && (
                            <span className="text-red-500 text-xs mt-1">{errors.teacherAddress.message}</span>
                        )}
        </div>
         <div>
                        <Label>Select Subject</Label>
                        <Controller
                            control={control}
                            name="teacherSubject"
                            rules={{ required: "Subject is required" }}
                            render={({ field }) => (
                                <Select
                                    options={options}
                                    placeholder="Select a subject"
                                    {...field}
                                />
                            )}
                        />
                        {errors.teacherSubject && (
                            <span className="text-red-500 text-xs mt-1">{errors.teacherSubject.message}</span>
                        )}
                    </div>
      <div>
            <Label>Upload file</Label>
            <Controller
              control={control}
              name="teacherImage"
              rules={{ required: "teacherImage is required" }}
              render={({ field: { onChange } }) => (
                <FileInput
                  onChange={(e) => {
                    onChange(e.target.files); // Pass FileList to react-hook-form
                  }}
                  className="custom-class"
                />
              )}
            />
            {errors.teacherImage && (
              <span className="text-red-500 text-xs mt-1">{errors.teacherImage.message}</span>
            )}
          </div>
       <button
          type="submit"
          // className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          className="h-11 w-full hover:border hover:rounded-lg appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
        >
          Submit
        </button>
      </div>
     </form>
      
      
    </ComponentCard>
        </div>
        </div>
    </div>
  )
}

export default AddTeacher








