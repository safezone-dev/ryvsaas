"use client";

import UserModal from "@/components/UserModal";

export default function UserHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Usuarios
        </h1>

        <p className="text-sm text-slate-500">
          Administración de usuarios del sistema
        </p>
      </div>

      <UserModal />

    </div>
  );
}