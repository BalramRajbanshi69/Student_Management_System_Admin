import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import InputGroup from "../../components/form/form-elements/InputGroup";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
// import RadioButtons from "../../components/form/form-elements/RadioButtons";
// import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
// import FileInputExample from "../../components/form/form-elements/FileInputExample";
// import SelectInputs from "../../components/form/form-elements/SelectInputs";
// import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
// import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";

export default function AddStudents() {


  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Add Students" />
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-xl">
          <DefaultInputs />
          {/* <SelectInputs /> */}
          {/* <TextAreaInput /> */}
          {/* <InputStates /> */}
        </div>
        <div className="space-y-6">
          {/* <InputGroup /> */}
          {/* <FileInputExample /> */}
          {/* <CheckboxComponents /> */}
          {/* <RadioButtons /> */}
          {/* <ToggleSwitch /> */}
          {/* <DropzoneComponent /> */}
        </div>
      </div>
    </div>
  );
}
