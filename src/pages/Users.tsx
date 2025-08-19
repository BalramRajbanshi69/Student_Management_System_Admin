import ComponentCard from "../components/common/ComponentCard"
import PageBreadcrumb from "../components/common/PageBreadCrumb"
import PageMeta from "../components/common/PageMeta"
import BasicTableThree from "../components/tables/BasicTables/BasicTableThree"


const Users = () => {
  
  
  return (
    <div>
        <PageMeta
        title="Admin SMS Dashboard | Admin SMS- React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for Admin SMS- React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="All Users" />
       <div className="space-y-6">
        <ComponentCard title="All Users Data Information">
          <BasicTableThree />
        </ComponentCard>
      </div>
    </div>
  )
}

export default Users