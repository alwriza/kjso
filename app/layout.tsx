import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KJSO — Kazakhstan Junior Science Olympiad",
  description: "Национальная олимпиада по естественным наукам для школьников Казахстана",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={unbounded.variable}>
      <body>{children}</body>
    </html>
  );
}