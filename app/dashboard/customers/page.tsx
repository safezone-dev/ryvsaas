import { supabase } from "@/lib/supabase";

export default async function CustomersPage() {
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("balance", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Clientes
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                Cliente
              </th>

              <th className="text-left p-4">
                Saldo
              </th>

              <th className="text-left p-4">
                Facturas
              </th>

              <th className="text-left p-4">
                Último Pago
              </th>
            </tr>
          </thead>

          <tbody>
            {customers?.map((customer) => (
              <tr
                key={customer.id}
                className="border-t"
              >
                <td className="p-4">
                  {customer.display_name}
                </td>

                <td className="p-4">
                  $
                  {Number(
                    customer.balance
                  ).toLocaleString()}
                </td>

                <td className="p-4">
                  {customer.invoice_count}
                </td>

                <td className="p-4">
                  {customer.last_payment_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}