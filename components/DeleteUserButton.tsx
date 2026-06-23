"use client";

import { Trash2 } from "lucide-react";

export default function DeleteUserButton({
  id,
}: {
  id: string;
}) {

  async function handleDelete() {

    const ok = confirm(
      "¿Desea eliminar este usuario?"
    );

    if (!ok) return;

    const response = await fetch(
      `/api/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      alert(result.error);
      return;
    }

    alert("Usuario eliminado");

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="
        bg-red-100
        hover:bg-red-200
        text-red-700
        p-2
        rounded-lg
      "
    >
      <Trash2 size={16} />
    </button>
  );
}