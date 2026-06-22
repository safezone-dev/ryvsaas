"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase_old";

export default function Home() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return (
    <div className="p-10">
      Conexión Supabase OK
    </div>
  );
}