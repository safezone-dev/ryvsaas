import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYV Cobros",
  description: "Sistema de Gestión de Cuentas por Cobrar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
