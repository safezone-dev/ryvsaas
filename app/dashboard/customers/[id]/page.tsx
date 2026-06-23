import { supabase } from "@/lib/supabase";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // CLIENTE
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (!customer) {
    return (
      <div className="p-6">
        Cliente no encontrado
      </div>
    );
  }

  // FACTURAS DEL CLIENTE
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq(
      "customer_name",
      customer.display_name
    )
    .order("invoice_date", {
      ascending: false,
    });

  return (
    <div className="space-y-6">

      {/* ENCABEZADO */}

      <div>

        <h1 className="text-3xl font-bold">
          {customer.display_name}
        </h1>

        <p className="text-slate-500">
          ID QuickBooks: {customer.qb_customer_id}
        </p>

      </div>

      {/* KPIs */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow">

          <p className="text-sm text-slate-500">
            Saldo pendiente
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            ₡{" "}
            {Number(
              customer.balance || 0
            ).toLocaleString("es-CR")}
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow">

          <p className="text-sm text-slate-500">
            Facturas
          </p>

          <h2 className="text-3xl font-bold">
            {invoices?.length || 0}
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow">

          <p className="text-sm text-slate-500">
            Último pago
          </p>

          <h2 className="text-xl font-bold">
            {customer.last_payment_date || "-"}
          </h2>

        </div>

      </div>

      {/* FACTURAS */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="p-6 border-b flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold">
              Facturas
            </h2>

            <p className="text-sm text-slate-500">
              Total facturas: {invoices?.length || 0}
            </p>

          </div>

        </div>

        {/* ESCRITORIO */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-4">
                  Factura
                </th>

                <th className="text-left p-4">
                  Fecha
                </th>

                <th className="text-left p-4">
                  Vence
                </th>

                <th className="text-right p-4">
                  Total
                </th>

                <th className="text-right p-4">
                  Saldo
                </th>

                <th className="text-center p-4">
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              {invoices?.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4">
                    {invoice.invoice_number}
                  </td>

                  <td className="p-4">
                    {invoice.invoice_date}
                  </td>

                  <td className="p-4">
                    {invoice.due_date}
                  </td>

                  <td className="p-4 text-right">

                    ₡{" "}
                    {Number(
                      invoice.total_amount
                    ).toLocaleString("es-CR")}

                  </td>

                  <td className="p-4 text-right font-semibold text-red-600">

                    ₡{" "}
                    {Number(
                      invoice.balance
                    ).toLocaleString("es-CR")}

                  </td>

                  <td className="p-4 text-center">

                    {Number(invoice.balance) === 0 ? (

                      <span className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        Pagada
                      </span>

                    ) : (

                      <span className="
                        bg-red-100
                        text-red-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        Pendiente
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MÓVIL */}

        <div className="md:hidden p-4 space-y-4">

          {invoices?.map((invoice) => (

            <div
              key={invoice.id}
              className="border rounded-2xl p-4"
            >

              <h3 className="font-semibold">
                {invoice.invoice_number}
              </h3>

              <div className="mt-3 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Fecha</span>
                  <span>{invoice.invoice_date}</span>
                </div>

                <div className="flex justify-between">
                  <span>Vence</span>
                  <span>{invoice.due_date}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>

                  <span>
                    ₡{" "}
                    {Number(
                      invoice.total_amount
                    ).toLocaleString("es-CR")}
                  </span>

                </div>

                <div className="flex justify-between">
                  <span>Saldo</span>

                  <span className="font-semibold text-red-600">

                    ₡{" "}
                    {Number(
                      invoice.balance
                    ).toLocaleString("es-CR")}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}