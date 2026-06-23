import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (!invoice) {
    return (
      <div className="p-6">
        Factura no encontrada
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Factura {invoice.invoice_number}
          </h1>

          <p className="text-slate-500">
            {invoice.customer_name}
          </p>

        </div>

        <Link
          href="/dashboard/invoices"
          className="
            bg-slate-100
            px-4
            py-2
            rounded-xl
          "
        >
          Volver
        </Link>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-sm text-slate-500">
            Total
          </p>

          <h2 className="text-3xl font-bold">
            ₡ {Number(invoice.total_amount).toLocaleString("es-CR")}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-sm text-slate-500">
            Saldo
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            ₡ {Number(invoice.balance).toLocaleString("es-CR")}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-sm text-slate-500">
            Vence
          </p>

          <h2 className="text-xl font-bold">
            {invoice.due_date}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <p className="text-sm text-slate-500">
            Estado
          </p>

          <div className="mt-3">

            {Number(invoice.balance) === 0 ? (

              <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm">
                Pagada
              </span>

            ) : (

              <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm">
                Pendiente
              </span>

            )}

          </div>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        <button
          className="
            bg-green-600
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          📱 Enviar WhatsApp
        </button>

        <button
          className="
            bg-[#0B3A6E]
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          📄 Descargar PDF
        </button>

      </div>

    </div>
  );
}