import type { Metadata } from "next";
import "../styles/globals.css";
import { robotoMono } from "@/shared/fonts";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${robotoMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}