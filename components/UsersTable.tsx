"use client";

import { useState } from "react";
import EditUserModal from "@/components/EditUserModal";
import DeleteUserButton from "@/components/DeleteUserButton";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  active: boolean;
};

export default function UsersTable({
  users,
}: {
  users: User[];
}) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.full_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-80 border rounded-xl p-3"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-5 py-4">
                  Nombre
                </th>

                <th className="text-left px-5 py-4">
                  Correo
                </th>

                <th className="text-center px-5 py-4">
                  Rol
                </th>

                <th className="text-center px-5 py-4">
                  Estado
                </th>

                <th className="text-center px-5 py-4">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="px-5 py-4 font-medium">
                    {user.full_name}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    {user.active ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                        Inactivo
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
  <div className="flex justify-center gap-2">

    <EditUserModal user={user} />

    <DeleteUserButton
      id={user.id}
    />

  </div>
</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}