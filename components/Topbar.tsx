"use client";

import { Menu, Bell, UserCircle2 } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";

export default function Topbar() {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 md:px-6 flex items-center justify-between">

      {/* IZQUIERDA */}

      <div className="flex items-center gap-3">

        {/* BOTÓN MÓVIL */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            RYV Cobros
          </h1>

          <p className="hidden sm:block text-xs text-slate-500">
            Gestión de Cuentas por Cobrar
          </p>
        </div>

      </div>

      {/* DERECHA */}

      <div className="flex items-center gap-4">

        <div className="hidden lg:block text-sm text-slate-500">
          QuickBooks Online
        </div>

        <button className="p-2 rounded-lg hover:bg-slate-100">
          <Bell size={20} className="text-slate-500" />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-100">
          <UserCircle2 size={24} className="text-slate-600" />
        </button>

      </div>

    </header>
  );
}