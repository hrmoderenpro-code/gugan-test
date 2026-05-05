import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GUGAN | Next-Generation Workforce Infrastructure",
  description: "Platform HRIS modern dengan AI & kontrol penuh data perusahaan. Kelola SDM lebih mudah, cepat, dan aman dengan GUGAN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="dark-mode">
        {children}
      </body>
    </html>
  );
}
