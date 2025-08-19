import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableTwo from "../../components/tables/BasicTables/BasicTableTwo";

export default function AllTeachers() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | Admin SMS- Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for Admin SMS- React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="All Teachers" />
      <div className="space-y-6">
        <ComponentCard title="All Teachers Data Information Table">
          <BasicTableTwo />
        </ComponentCard>
      </div>
    </>
  );
}
