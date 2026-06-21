import Sidebar from "@/components/Sidebar";
import DashboardContainer from "@/components/DashboardContainer";
import { SidebarProvider } from "@/components/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="bg-slate-100 min-h-screen">

        <Sidebar />

        <DashboardContainer>
          {children}
        </DashboardContainer>

      </div>
    </SidebarProvider>
  );
}