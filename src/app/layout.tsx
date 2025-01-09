"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppBar, Toolbar,Typography, Container,
  IconButton,Box,InputBase,Drawer,List,ListItem,ListItemText,Button } from "@mui/material";
  import PrintIcon from "@mui/icons-material/Print";
  import SearchIcon from "@mui/icons-material/Search";
  import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
  import LogoutIcon from "@mui/icons-material/Logout";
import ThemeRegistry from "./ThemeRegistry";
import Image from "next/image"
import Link from "next/link";
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
