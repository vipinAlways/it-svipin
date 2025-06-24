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
  description: "Explore Vipin's personal portfolio, web projects, and design work. Frontend developer with a passion for building interactive experiences.",
  keywords: ["Vipin", "Web Developer", "Frontend Developer", "Portfolio", "JavaScript", "React", "Next.js", "UI/UX Designer"],
  authors: [{ name: "Vipin", url: "https://itsvipin.me" }],
  creator: "Vipin",
  metadataBase: new URL("https://itsvipin.me"),
  openGraph: {
    title: "Vipin Web Developer & Designer",
    description: "Discover the portfolio of Vipin, a frontend developer focused on building modern, responsive, and creative websites.",
    url: "https://itsvipin.me",
    siteName: "Vipin Portfolio",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Vipin Portfolio Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipin  Web Developer & Designer",
    description: "Check out Vipin's web development portfolio and projects.", 
  },
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
                &copy; {new Date().getFullYear().toLocaleString().replace(",","")} Vipin.
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
