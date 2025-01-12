"use client"
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import Footer from "@/components/Footer";
import { AccountProvider } from "@/context/AccountContext";
import ClientNavbar from "@/components/ClientNavbar";
import { SessionProvider } from "next-auth/react";



export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;}>) {
    
  return (
    <html lang="en">
         <body>
      <SessionProvider>
        <ThemeRegistry>
          <AccountProvider>
            <ClientNavbar />
            <main>{children}</main>
            <Footer />
          </AccountProvider>
        </ThemeRegistry>
      </SessionProvider>
      </body>

    </html>
  );
}
