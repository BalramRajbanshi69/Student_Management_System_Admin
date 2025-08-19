import { Controller, useForm } from "react-hook-form";
import { EnvelopeIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import FileInput from "../input/FileInput";
import Input from "../input/InputField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { addStudent } from "../../../store/studentSlice";
import { useAppDispatch } from "../../../store/hooks";


export default function DefaultInputs() {
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
interface StudentFormInputs {
    name: string;
    age: number;
    email: string;
    course: string;
    image: FileList;
}

    const { register, handleSubmit, formState: { errors },control,reset } = useForm<StudentFormInputs>();


  
   

    const handleStudentSubmit = async (data: StudentFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age.toString());
      formData.append("email", data.email);
      formData.append("course", data.course);

      // Log file selection
      // console.log("Selected files:", data.image);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
        // console.log("File name:", data.image[0].name);
      } else {
        throw new Error("Image is required!");
      }

      // Log FormData contents
      // console.log("FormData contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

       await dispatch(addStudent(formData));
      // console.log("Add student response:", response);
      toast.success("Student added successfully!");
      reset();
      navigate("/all-students");
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast.error(error.message || "Failed to add student. Please try again!");
    }
  };

  return (
    <ComponentCard title="Student Information">
     <form onSubmit={handleSubmit(handleStudentSubmit)}>
       <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name"  error={errors.name}
                            {...register("name", {
                                required: "Name is required",
                            })}/>
                            {errors.name && (
                            <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
                        )}
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" error={errors.age}
                            {...register("age", {
                                required: "Age is required",
                                min: {
                                    value: 10,
                                    message: "Student must be at least 10 years old"
                                }
                            })} />
                            {errors.age && (
                            <span className="text-red-500 text-xs mt-1">{errors.age.message}</span>
                        )}
        </div>
         <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="email"
               error={errors.email}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
              className="pl-[62px]"
              
            />
            {errors.email && (
                            <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
                        )}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
         <div>
                        <Label>Select Course</Label>
                        <Controller
                            control={control}
                            name="course"
                            rules={{ required: "Course is required" }}
                            render={({ field }) => (
                                <Select
                                    options={options}
                                    placeholder="Select a Course"
                                    {...field}
                                />
                            )}
                        />
                        {errors.course && (
                            <span className="text-red-500 text-xs mt-1">{errors.course.message}</span>
                        )}
                    </div>

      <div>
            <Label>Upload file</Label>
            <Controller
              control={control}
              name="image"
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <FileInput
                  onChange={(e) => {
                    onChange(e.target.files); // Pass FileList to react-hook-form
                  }}
                  className="custom-class"
                />
              )}
            />
            {errors.image && (
              <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>
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
  );
}
