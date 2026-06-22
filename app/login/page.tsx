"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase_old";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    async function handleLogin(
      e: React.FormEvent
    ) {
      e.preventDefault();
    
      setLoading(true);
    
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
      console.log("DATA:", data);
      console.log("ERROR:", error);
    
      setLoading(false);
    
      if (error) {
        alert(error.message);
        return;
      }
    
      router.push("/dashboard");
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img
            src="https://ryvcontadores.com/wp-content/uploads/2024/01/RyV-logotipo-298x140-1.png"
            alt="RYV"
            className="w-56"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          RYV Cobros
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sistema de Gestión de Cuentas por Cobrar
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white p-3 rounded-lg font-semibold"
            style={{
              backgroundColor: "#0B3A6E",
            }}
          >
            {loading
              ? "Ingresando..."
              : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}