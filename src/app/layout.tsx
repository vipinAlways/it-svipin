import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalClickSound from "@/components/GlobalClickSound";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vipin",
  description: "The Developer's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F4F3] dark:bg-[#5B2333]  select-none`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<p>Loading...</p>}>
            <GlobalClickSound />
            <main className="relative text-[#5B2333] dark:text-[#F7F4F3] padd-10">
              {children}
            </main>
            <footer className="w-full h-10 bg-black  text-white text-center">
              <p>
                &copy; {new Date().getFullYear().toLocaleString().replace(",","")} Real Toxic.
                All rights reserved.
              </p>
            </footer>
            <div className="h-20 w-full sm:hidden"></div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
