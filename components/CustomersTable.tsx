"use client";

import { useState } from "react";
import Link from "next/link";

type Customer = {
  id: string;
  display_name: string;
  balance: number | null;
  invoice_count: number;
  last_payment_date: string | null;
};

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 20;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.display_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const paginatedCustomers =
    filteredCustomers.slice(
      startIndex,
      endIndex
    );

  const totalPages = Math.ceil(
    filteredCustomers.length /
      ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      {/* HEADER */}

      <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="font-bold text-slate-800">
          Total clientes: {customers.length}
        </div>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="
            w-full
            md:w-80
            border
            rounded-xl
            p-3
          "
        />

      </div>

      {/* TABLA */}

     {/* ESCRITORIO */}
<div className="hidden md:block overflow-x-auto">

<table className="w-full text-sm">

  <thead className="bg-slate-100">
    <tr>
      <th className="text-left p-4">Cliente</th>
      <th className="text-right p-4">Saldo</th>
      <th className="text-center p-4">Facturas</th>
      <th className="text-center p-4">Último Pago</th>
      <th className="text-center p-4">Acciones</th>
    </tr>
  </thead>

  <tbody>

    {paginatedCustomers.map((customer) => (

      <tr
        key={customer.id}
        className="border-t hover:bg-slate-50"
      >
        <td className="p-4 font-medium">
          {customer.display_name}
        </td>

        <td className="p-4 text-right text-red-600 font-semibold">
          ₡ {Number(customer.balance || 0).toLocaleString("es-CR")}
        </td>

        <td className="p-4 text-center">
          {customer.invoice_count}
        </td>

        <td className="p-4 text-center">
          {customer.last_payment_date || "-"}
        </td>

        <td className="p-4 text-center">
          <Link
            href={`/dashboard/customers/${customer.id}`}
            className="bg-[#0B3A6E] text-white px-3 py-2 rounded-lg text-xs"
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
<div className="md:hidden space-y-4 p-4">

{paginatedCustomers.map((customer) => (

  <div
    key={customer.id}
    className="border rounded-2xl p-4 shadow-sm"
  >

    <h3 className="font-semibold text-slate-800">
      {customer.display_name}
    </h3>

    <div className="mt-3 space-y-2 text-sm">

      <div className="flex justify-between">
        <span className="text-slate-500">
          Saldo
        </span>

        <span className="font-semibold text-red-600">
          ₡ {Number(customer.balance || 0).toLocaleString("es-CR")}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">
          Facturas
        </span>

        <span>
          {customer.invoice_count}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">
          Último pago
        </span>

        <span>
          {customer.last_payment_date || "-"}
        </span>
      </div>

    </div>

    <Link
      href={`/dashboard/customers/${customer.id}`}
      className="
        mt-4
        w-full
        flex
        justify-center
        bg-[#0B3A6E]
        text-white
        py-3
        rounded-xl
        font-medium
      "
    >
      Ver cliente
    </Link>

  </div>

))}

</div>

      {/* PAGINACIÓN */}

      <div className="flex items-center justify-between p-4 border-t">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
          className="
            bg-slate-100
            hover:bg-slate-200
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Anterior
        </button>

        <span className="text-sm text-slate-600">
          Página {currentPage} de{" "}
          {totalPages}
        </span>

        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
          className="
            bg-slate-100
            hover:bg-slate-200
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