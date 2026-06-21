"use client";

import { useSidebar } from "@/components/SidebarContext";
import Topbar from "@/components/Topbar";

export default function DashboardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`
        flex
        flex-col
        min-h-screen
        transition-all
        duration-300

        ${
          collapsed
            ? "md:ml-20"
            : "md:ml-64"
        }
      `}
    >
      <Topbar />

      <main className="flex-1 p-3 md:p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}