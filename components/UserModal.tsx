"use client";

import { useState } from "react";

export default function UserModal() {
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
  try {

    setLoading(true);

    const response = await fetch(
      "/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          active: true,
        }),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      alert(result.error);
      return;
    }

    alert(
      "Usuario creado correctamente"
    );

    setOpen(false);

    window.location.reload();

  } catch (error) {

    alert(
      "Error al crear usuario"
    );

  } finally {

    setLoading(false);

  }
}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          bg-[#0B3A6E]
          hover:bg-[#0a325d]
          text-white
          px-4
          py-2
          rounded-xl
          text-sm
          font-medium
        "
      >
        + Nuevo Usuario
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-xl font-bold mb-6">
              Nuevo Usuario
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="
                  bg-slate-100
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Cancelar
              </button>

              <button
  onClick={handleSave}
  disabled={loading}
  className="
    bg-[#0B3A6E]
    text-white
    px-4
    py-2
    rounded-xl
    disabled:opacity-50
  "
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