import PersistentDrawerLeft from "../../components/drawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistentDrawerLeft>
      <div className="min-h-screen">{children}</div>
    </PersistentDrawerLeft>
  );
};

export default DashboardLayout;
