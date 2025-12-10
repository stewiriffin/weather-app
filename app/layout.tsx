import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "@/lib/WeatherContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Dashboard - Real-time Weather Updates",
  description: "Get real-time weather updates and 5-day forecasts for any city worldwide. Built with Next.js 14 and OpenWeatherMap API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}
