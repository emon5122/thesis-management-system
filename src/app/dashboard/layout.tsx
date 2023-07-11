import Dashboard from "@/components/dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row">
            <div className="pr-72">
                <Dashboard />
            </div>
            <div className="mt-20">{children}</div>
        </div>
    );
};

export default DashboardLayout;
