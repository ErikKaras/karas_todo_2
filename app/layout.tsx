import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-do App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="dark">
      <body className={`${font.className} pb-8`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{ // Přidána hodnota pro červenou barvu textu
            foreground: 'hsl(var(--foreground))', // Červená barva textu
          }}
      >
        <Navbar />
        {children}
      </ThemeProvider>
      <Toaster richColors closeButton duration={2000} position="bottom-left" />
      </body>
      </html>
  );
}
