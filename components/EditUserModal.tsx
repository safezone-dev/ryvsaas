"use client";

import { useState } from "react";

type User = {
  id: string;
  full_name: string;
  email: string;
  active: boolean;
};

export default function EditUserModal({
  user,
}: {
  user: User;
}) {
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] =
    useState(user.full_name);

  const [active, setActive] =
    useState(user.active);

    const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            active,
            password,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(result.error);
        return;
      }

      alert("Usuario actualizado");

      setOpen(false);

      window.location.reload();

    } catch {
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          bg-slate-100
          hover:bg-slate-200
          px-3
          py-2
          rounded-lg
          text-xs
        "
      >
        Editar
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-6">

            <h2 className="text-xl font-bold mb-6">
              Editar Usuario
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded-xl p-3 bg-slate-100"
              />

<input
  type="password"
  placeholder="Nueva contraseña (opcional)"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="w-full border rounded-xl p-3"
/>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) =>
                    setActive(
                      e.target.checked
                    )
                  }
                />

                Usuario activo

              </label>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="bg-slate-100 px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-[#0B3A6E] text-white px-4 py-2 rounded-xl"
              >
                {loading
                  ? "Guardando..."
                  : "Guardar"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}