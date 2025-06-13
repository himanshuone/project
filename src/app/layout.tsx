import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { StudyTimerProvider } from "@/contexts/StudyTimerContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Study Timer - Focus & Achieve",
  description: "A modern study timer app with goals, motivation, and progress tracking",
  keywords: ["study", "timer", "productivity", "goals", "motivation"],
  authors: [{ name: "Study Timer App" }],
  themeColor: "#3B82F6",
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <StudyTimerProvider>
              {children}
            </StudyTimerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
