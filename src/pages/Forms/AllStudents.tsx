import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne"

const AllStudents = () => {
  
  return (
    <div>
        <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="All Students" />
       <div className="space-y-6">
        <ComponentCard title="All Students Data Information">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  )
}

export default AllStudents