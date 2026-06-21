import { supabase } from "@/lib/supabase";

export default async function InvoicesPage() {
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("due_date");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Facturas
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Factura
              </th>

              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Vence
              </th>

              <th className="p-4 text-left">
                Saldo
              </th>

              <th className="p-4 text-left">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices?.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t"
              >
                <td className="p-4">
                  {invoice.invoice_number}
                </td>

                <td className="p-4">
                  {invoice.customer_name}
                </td>

                <td className="p-4">
                  {invoice.due_date}
                </td>

                <td className="p-4">
                  $
                  {Number(
                    invoice.balance
                  ).toLocaleString()}
                </td>

                <td className="p-4">
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}