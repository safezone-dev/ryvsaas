"use client";

import { useSidebar } from "@/components/SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const {
    mobileOpen,
    setMobileOpen,
    collapsed,
    setCollapsed,
  } = useSidebar();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Clientes",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      label: "Facturas",
      href: "/dashboard/invoices",
      icon: FileText,
    },
    {
      label: "Pagos",
      href: "/dashboard/payments",
      icon: DollarSign,
    },
    {
      label: "Usuarios",
      href: "/dashboard/users",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* OVERLAY MOVIL */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-50
          flex
          flex-col
          bg-[#0B3A6E]
          text-white
          border-r
          border-blue-900
          transition-all
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* HEADER */}

        <div className="h-20 px-4 flex items-center justify-between border-b border-blue-800">
          {!collapsed && (
            <img
              src="https://ryvcontadores.com/wp-content/uploads/2024/01/RyV-logotipo-298x140-1.png"
              alt="RYV"
              className="w-36 object-contain"
            />
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-800"
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        {/* MENU */}

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  transition-all
                  ${
                    active
                      ? "bg-white text-[#0B3A6E] font-semibold"
                      : "hover:bg-blue-800"
                  }
                `}
              >
                <Icon size={20} />

                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}

        {!collapsed && (
          <div className="p-4 text-xs text-blue-200 border-t border-blue-800">
            RYV Cobros v1.0
          </div>
        )}
      </aside>
    </>
  );
}