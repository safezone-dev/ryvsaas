import { supabase } from "@/lib/supabase";
import CustomersTable from "@/components/CustomersTable";

async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("display_name");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Clientes
        </h1>

        <p className="text-sm text-slate-500">
          Gestión de cuentas por cobrar
        </p>
      </div>

      <CustomersTable
        customers={customers}
      />

    </div>
  );
}