import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";

// Твой оригинальный шрифт
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

// Твои оригинальные метаданные
export const metadata: Metadata = {
  title: "KJSO — Kazakhstan Junior Science Olympiad",
  description: "Национальная олимпиада по естественным наукам для школьников Казахстана",
  icons: {
    icon: '/favicon.png', 
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Принимаем параметры роута (в Next 15/16 это Promise)
}) {
  // Достаем текущий язык (ru, en или kk)
  const { locale } = await params;
  
  // Загружаем словари для этого языка на стороне сервера
  const messages = await getMessages();

  return (
    <html lang={locale} className={unbounded.variable}>
      <body>
        {/* Передаем переводы в клиентские компоненты (включая твой page.tsx с "use client") */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}