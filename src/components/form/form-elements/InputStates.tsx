// import { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Input from "../input/InputField";
// import Label from "../Label";
// export default function InputStates() {
//   const [email, setEmail] = useState("");
//   const [emailTwo, setEmailTwo] = useState("");
//   const [error, setError] = useState(false);

//   // Simulate a validation check
//   const validateEmail = (value: string) => {
//     const isValidEmail =
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
//     setError(!isValidEmail);
//     return isValidEmail;
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     validateEmail(value);
//   };
//   const handleEmailTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmailTwo(value);
//     validateEmail(value);
//   };
//   return (
//     <ComponentCard
//       title="Input States"
//       desc="Validation styles for error, success and disabled states on form controls."
//     >
//       <div className="space-y-5 sm:space-y-6">
//         {/* Error Input */}
//         <div>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             value={email}
//             error={error}
//             onChange={handleEmailChange}
//             placeholder="Enter your email"
//             hint={error ? "This is an invalid email address." : ""}
//           />
//         </div>

//         {/* Success Input */}
//         <div>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             value={emailTwo}
//             success={!error}
//             onChange={handleEmailTwoChange}
//             placeholder="Enter your email"
//             hint={!error ? "This is an success message." : ""}
//           />
//         </div>

//         {/* Disabled Input */}
//         <div>
//           <Label>Email</Label>
//           <Input
//             type="text"
//             value="disabled@example.com"
//             disabled={true}
//             placeholder="Disabled email"
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }





import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
// You might need to import FieldError from your form library or define a mock type
// For example: import { FieldError } from 'react-hook-form';

// If you don't have a library, you can define your own simple type
// type FieldError = { message?: string; type?: string };

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [isEmailOneValid, setIsEmailOneValid] = useState(true);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailOneValid(validateEmail(value));
  };

  const handleEmailTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTwo(value);
  };

  // Create a mock FieldError object to pass to the Input component
  const emailError = isEmailOneValid
    ? undefined
    : {
        type: "manual",
        message: "This is an invalid email address.",
      };

  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            error={emailError}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            hint={emailError?.message}
          />
        </div>

        {/* Success Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={emailTwo}
            success={validateEmail(emailTwo)}
            onChange={handleEmailTwoChange}
            placeholder="Enter your email"
            hint={validateEmail(emailTwo) ? "This is a success message." : ""}
          />
        </div>

        {/* Disabled Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="text"
            value="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
          />
        </div>
      </div>
    </ComponentCard>
  );
}