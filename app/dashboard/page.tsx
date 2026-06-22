import { supabase } from "@/lib/supabase_old";

async function getDashboardData() {
  const { data: summary } = await supabase
    .from("dashboard_summary")
    .select("*")
    .single();

  const { data: topClients } = await supabase
    .from("dashboard_top_clients")
    .select("*")
    .limit(10);

  const { data: recentInvoices } = await supabase
    .from("dashboard_recent_invoices")
    .select("*")
    .limit(10);

  return {
    summary,
    topClients,
    recentInvoices,
  };
}
import {
  Wallet,
  FileClock,
  AlertTriangle,
  Receipt,
} from "lucide-react";
export default async function DashboardPage() {
  const { summary, topClients, recentInvoices } =
    await getDashboardData();

  return (
    <div className="min-h-screen bg-slate-100 p-3 md:p-6">
      {/* Header */}

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <img
          src="https://ryvcontadores.com/wp-content/uploads/2024/01/RyV-logotipo-298x140-1.png"
          alt="RYV"
          className="h-10 md:h-14 object-contain"
        />

        <div>
          <h1 className="text-2xl tracking-tight font-bold text-slate-800">
            Dashboard de Cobros
          </h1>

          <p className="text-gray-500">
            Integración QuickBooks Online
          </p>
        </div>
      </div>

 {/* KPI CARDS */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

{/* TOTAL POR COBRAR */}

<div className="bg-white rounded-2xl shadow-sm border p-5">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-sm text-gray-500">
        Total por Cobrar
      </p>

      <h2 className="mt-3 text-2xl font-bold text-red-600">
        ₡ {Number(summary?.total_por_cobrar || 0).toLocaleString("es-CR")}
      </h2>

      <p className="text-xs text-slate-400 mt-2">
        Saldo actual
      </p>

    </div>

    <Wallet
      size={42}
      className="text-red-500"
    />

  </div>

</div>

{/* PENDIENTES */}

<div className="bg-white rounded-2xl shadow-sm border p-5">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-sm text-gray-500">
        Facturas Pendientes
      </p>

      <h2 className="mt-3 text-3xl font-bold text-amber-500">
        {summary?.facturas_pendientes}
      </h2>

      <p className="text-xs text-slate-400 mt-2">
        Pendientes de pago
      </p>

    </div>

    <FileClock
      size={42}
      className="text-amber-500"
    />

  </div>

</div>

{/* VENCIDAS */}

<div className="bg-white rounded-2xl shadow-sm border p-5">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-sm text-gray-500">
        Facturas Vencidas
      </p>

      <h2 className="mt-3 text-3xl font-bold text-red-500">
        {summary?.facturas_vencidas}
      </h2>

      <p className="text-xs text-slate-400 mt-2">
        Requieren atención
      </p>

    </div>

    <AlertTriangle
      size={42}
      className="text-red-500"
    />

  </div>

</div>

{/* TOTAL FACTURAS */}

<div className="bg-white rounded-2xl shadow-sm border p-5">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-sm text-gray-500">
        Total Facturas
      </p>

      <h2 className="mt-3 text-3xl font-bold text-blue-600">
        {summary?.total_facturas}
      </h2>

      <p className="text-xs text-slate-400 mt-2">
        Registradas
      </p>

    </div>

    <Receipt
      size={42}
      className="text-blue-500"
    />

  </div>

</div>

</div>
{/* FIN KPI CARDS */}

{/* TOP CLIENTES */}

<div className="bg-white rounded-xl shadow p-5 mb-8">

  <h2 className="font-bold text-base mb-5">
    Top 10 Clientes con Mayor Saldo
  </h2>

  <div className="space-y-4">

    {topClients?.map((client) => {

      const porcentaje =
        (Number(client.saldo) /
          Number(topClients[0].saldo)) *
        100;

      return (

        <div key={client.customer_name}>

          <div className="flex justify-between text-sm mb-1">

            <span className="font-medium truncate max-w-[70%]">
              {client.customer_name}
            </span>

            <span className="font-bold text-red-600">
              ₡{" "}
              {Number(client.saldo).toLocaleString(
                "es-CR",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>

          </div>

          <div className="h-3 bg-slate-200 rounded-full">

            <div
              className="h-3 bg-red-500 rounded-full"
              style={{
                width: `${porcentaje}%`,
              }}
            />

          </div>

        </div>

      );
    })}

  </div>

</div>

{/* TERMINA TOP CLIENTES */}


 {/* ULTIMAS FACTURAS */}

  <div className="bg-white rounded-xl shadow">
  <div className="p-4 border-b">
    <h2 className="font-bold text-base">
      Últimas Facturas
    </h2>
  </div>

  <div className="hidden md:block">
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
    <thead className="bg-slate-100">
  <tr>
    <th className="px-3 py-2 text-left text-xs">
      Factura
    </th>

    <th className="px-3 py-2 text-left text-xs">
      Cliente
    </th>

    <th className="px-3 py-2 text-right text-xs">
      Saldo
    </th>

    <th className="px-3 py-2 text-center text-xs">
      Estado
    </th>
  </tr>
</thead>

      <tbody>
  {recentInvoices?.map((invoice) => {

    const vencida =
      invoice.balance > 0 &&
      new Date(invoice.due_date) < new Date();

    return (
      <tr
        key={invoice.invoice_number}
        className="border-b hover:bg-slate-50 text-xs"
      >
        <td className="px-3 py-3 font-semibold text-slate-700">
          {invoice.invoice_number}
        </td>

        <td className="px-3 py-3">
          <div className="font-medium">
            {invoice.customer_name}
          </div>

          <div className="text-[11px] text-gray-500">
            Monto: ₡{" "}
            {Number(invoice.total_amount).toLocaleString(
              "es-CR"
            )}
          </div>

          <div className="text-[11px] text-gray-500">
            Vence: {invoice.due_date}
          </div>
        </td>

        <td className="px-3 py-3 text-right font-bold">
          ₡{" "}
          {Number(invoice.balance).toLocaleString(
            "es-CR"
          )}
        </td>

        <td className="px-3 py-3 text-center">
          {invoice.balance === 0 ? (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px]">
              Pagada
            </span>
          ) : vencida ? (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-[10px]">
              Vencida
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px]">
              Pendiente
            </span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
    </table>
    
  </div>
</div>
{/* VERSION MOVIL */}

<div className="md:hidden p-3 space-y-4">

  {recentInvoices?.map((invoice) => {

    const vencida =
      invoice.balance > 0 &&
      new Date(invoice.due_date) < new Date();

    return (

      <div
        key={invoice.invoice_number}
        className="bg-slate-50 border rounded-xl p-4 shadow-sm"
      >

        <div className="flex justify-between mb-3">

          <div>

            <div className="text-xs text-slate-500">
              Factura
            </div>

            <div className="font-bold">
              {invoice.invoice_number}
            </div>

          </div>

          <div>

            {invoice.balance === 0 ? (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px]">
                Pagada
              </span>
            ) : vencida ? (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-[10px]">
                Vencida
              </span>
            ) : (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px]">
                Pendiente
              </span>
            )}

          </div>

        </div>

        <div className="font-medium mb-2">
          {invoice.customer_name}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>

            <div className="text-slate-500">
              Monto
            </div>

            <div className="font-semibold">
              ₡ {Number(invoice.total_amount).toLocaleString("es-CR")}
            </div>

          </div>

          <div>

            <div className="text-slate-500">
              Saldo
            </div>

            <div className="font-semibold text-red-600">
              ₡ {Number(invoice.balance).toLocaleString("es-CR")}
            </div>

          </div>

        </div>

        <div className="mt-3 text-xs text-slate-500">

          Vence:
          {" "}
          {invoice.due_date}

        </div>

      </div>

    );
  })}

</div>
</div>
    </div>
    

  );
}