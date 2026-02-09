import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DELIKOS - Presentaciones Ejecutivas",
  description: "Presentaciones interactivas de resultados comerciales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
