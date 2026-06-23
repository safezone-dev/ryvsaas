"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { setMobileOpen } = useSidebar();
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [role, setRole] =
    useState("");

    useEffect(() => {
      loadUser();
    }, []);
    
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    
      console.log("AUTH USER:", user);
    
      if (!user) return;
    
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
    
      console.log("USER TABLE:", data);
      console.log("USER ERROR:", error);
    
      if (data) {
        setFullName(data.full_name);
        setRole(data.role);
      }
    }

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 md:px-6 flex items-center justify-between">

      {/* IZQUIERDA */}

      <div className="flex items-center gap-3">

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

        <div className="hidden md:block text-right">
          <p className="text-sm font-semibold text-slate-700">
            {fullName}
          </p>

          <p className="text-xs text-slate-500 capitalize">
            {role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            font-medium
          "
        >
          Salir
        </button>

      </div>

    </header>
  );
}