import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "../lib/utils"
import SessionProvider from "../components/session/SessionProvider";
import { getServerSession } from "next-auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Ecommerce WebSite",
  description: "Full Stack Ecommerce WebSite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession()
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}