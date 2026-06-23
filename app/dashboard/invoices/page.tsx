import { supabase } from "@/lib/supabase";
import InvoicesTable from "@/components/InvoicesTable";

async function getInvoices() {
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .order("due_date", {
      ascending: false,
    });

  return data || [];
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  const totalPorCobrar = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.balance || 0),
    0
  );

  const pendientes = invoices.filter(
    (invoice) => Number(invoice.balance) > 0
  ).length;

  const pagadas = invoices.filter(
    (invoice) => Number(invoice.balance) === 0
  ).length;

  const vencidas = invoices.filter(
    (invoice) =>
      Number(invoice.balance) > 0 &&
      new Date(invoice.due_date) < new Date()
  ).length;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Facturas
        </h1>

        <p className="text-sm text-slate-500">
          Gestión de cuentas por cobrar
        </p>

      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-sm text-slate-500">
            Total por cobrar
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            ₡ {totalPorCobrar.toLocaleString("es-CR")}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-sm text-slate-500">
            Pendientes
          </p>

          <h2 className="text-3xl font-bold">
            {pendientes}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-sm text-slate-500">
            Pagadas
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {pagadas}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-sm text-slate-500">
            Vencidas
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            {vencidas}
          </h2>

        </div>

      </div>

      <InvoicesTable invoices={invoices} />

    </div>
  );
}