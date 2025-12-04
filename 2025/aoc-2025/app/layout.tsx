import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advent of Code 2025",
  description: "Visualizations for AoC 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const days = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen overflow-hidden bg-gray-950 text-gray-100`}
      >
        <nav className="p-6 w-64 flex-shrink-0  bg-gray-900 flex flex-col rounded-br-2xl">
          <div className=" border-b border-gray-800">
            <h1 className="text-xl font-bold tracking-tight text-white">
              AoC 2025
            </h1>
            <p className="text-xs text-gray-500 mt-1">Visual Solutions</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white border-b-gray-800 border-b-1"
            >
              Home
            </Link>

            <div className="h-pax bg-gray-800 my-2" />

            {days.map((day) => (
              <Link
                key={day}
                href={`/days/${day}`}
                className="block px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white border-b-gray-800 border-b-1 border-l-gray-800 border-l-1"
              >
                Day {day}
              </Link>
            ))}
          </div>
        </nav>

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
