"use client";

import { useState } from "react";
import Link from "next/link";

export default function InvoicesTable({
  invoices,
}: {
  invoices: any[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todas");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  let filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoice_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  if (filter === "pendientes") {
    filteredInvoices = filteredInvoices.filter(
      (invoice) => Number(invoice.balance) > 0
    );
  }

  if (filter === "pagadas") {
    filteredInvoices = filteredInvoices.filter(
      (invoice) => Number(invoice.balance) === 0
    );
  }

  if (filter === "vencidas") {
    filteredInvoices = filteredInvoices.filter(
      (invoice) =>
        Number(invoice.balance) > 0 &&
        new Date(invoice.due_date) < new Date()
    );
  }

  const totalPages = Math.ceil(
    filteredInvoices.length / ITEMS_PER_PAGE
  );

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      {/* HEADER */}

      <div className="p-4 border-b flex flex-col lg:flex-row lg:justify-between gap-4">

        <div className="font-bold">
          Total facturas: {filteredInvoices.length}
        </div>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Buscar factura o cliente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-3 md:w-80"
          />

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-3"
          >
            <option value="todas">
              Todas
            </option>

            <option value="pendientes">
              Pendientes
            </option>

            <option value="pagadas">
              Pagadas
            </option>

            <option value="vencidas">
              Vencidas
            </option>

          </select>

        </div>

      </div>

      {/* ESCRITORIO */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full text-sm">

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

              <th className="p-4 text-right">
                Saldo
              </th>

              <th className="p-4 text-center">
                Estado
              </th>

              <th className="p-4 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedInvoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-t hover:bg-slate-50"
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

                <td className="p-4 text-right font-semibold text-red-600">
                  ₡{" "}
                  {Number(
                    invoice.balance
                  ).toLocaleString("es-CR")}
                </td>

                <td className="p-4 text-center">

                  {Number(invoice.balance) === 0 ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Pagada
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                      Pendiente
                    </span>

                  )}

                </td>

                <td className="p-4 text-center">

                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="
                      bg-[#0B3A6E]
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-xs
                    "
                  >
                    Ver
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MÓVIL */}

      <div className="md:hidden p-4 space-y-4">

        {paginatedInvoices.map((invoice) => (

          <div
            key={invoice.id}
            className="border rounded-2xl p-4 shadow-sm"
          >

            <h3 className="font-semibold">
              {invoice.invoice_number}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {invoice.customer_name}
            </p>

            <div className="mt-3 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Vence</span>
                <span>{invoice.due_date}</span>
              </div>

              <div className="flex justify-between">
                <span>Saldo</span>

                <span className="font-semibold text-red-600">
                  ₡ {Number(invoice.balance).toLocaleString("es-CR")}
                </span>

              </div>

            </div>

            <Link
              href={`/dashboard/invoices/${invoice.id}`}
              className="
                mt-4
                w-full
                flex
                justify-center
                bg-[#0B3A6E]
                text-white
                py-3
                rounded-xl
              "
            >
              Ver factura
            </Link>

          </div>

        ))}

      </div>

      {/* PAGINACIÓN */}

      <div className="flex justify-between items-center p-4 border-t">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="
            bg-slate-100
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Anterior
        </button>

        <span className="text-sm text-slate-600">
          Página {currentPage} de {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="
            bg-slate-100
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Siguiente
        </button>

      </div>

    </div>
  );
}