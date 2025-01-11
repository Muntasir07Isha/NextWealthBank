"use client"

import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ClientNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#333333", margin: 0, padding: 0, height: "58px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            minHeight: 50,
          }}
        >
          {/* Left Side (Logo and Print Button) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ marginLeft: 1 }} color="inherit">
              <PrintIcon />
            </IconButton>
            <Box sx={{ bgcolor: "#E7B649", px: 2, py: 0.5, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
                NetBank
              </Typography>
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

         
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: 1,
                px: 1,
              }}
            >
              <SearchIcon sx={{ color: "#000" }} />
              <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                Search bank
              </Typography>
            </Box>
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>

            <IconButton
  color="inherit"
  onClick={() =>
    session
      ? signOut({ callbackUrl: "/login" }) 
      : signIn("google", { callbackUrl: "/" }) 
  }
>
  <LogoutIcon />
</IconButton>



          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation Tabs */}
      <AppBar position="static" sx={{ bgcolor: "#f1f0e8", borderTop: "1px solid #ddd" }}>
        <Toolbar
          sx={{
            minHeight: 84,
            display: "flex",
            justifyContent: { xs: "flex-end", md: "space-between" },
            alignItems: "center",
          }}
        >
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Image src="/BankLogo.webp" alt="logo" width={94} height={84} />
              <Link href="/">
                <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                  My Home
                </Typography>
              </Link>
            </Box>
            <Link href="/view-accounts">
            <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                  View Account
                </Typography>
            </Link>
            <Link href="Transfers&BPAY">
            <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                    Transafers&BPAY
                </Typography>
            </Link>
            <Link href="Portfolio&Investment">
            <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                  Portfolio&Investment
                </Typography>
            </Link>
            <Link href="settings">
            <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                  Settings
                </Typography>
            </Link>

          <Link href="inbox">
            <Typography variant="button" sx={{
                   color: "black", 
                   textDecoration: "none",
                   fontWeight: "bold",
                   "&:hover": {
                  color: "#E7B649",
                    textDecoration: "underline", 
                            },
                   }}>
                  Inbox
                </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
<Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
  <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
    <List>
      <ListItemButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image src="/BankLogo.webp" alt="logo" width={94} height={84} />
        </Box>
      </ListItemButton>
      <ListItemButton component={Link} href="/">
        <ListItemText primary="My Home" />
      </ListItemButton>
      <ListItemButton component={Link} href="/view-accounts">
        <ListItemText primary="View Accounts" />
      </ListItemButton>
      <ListItemButton component={Link} href="/Transfers&BPAY">
        <ListItemText primary="Transfers & BPAY" />
      </ListItemButton>
      <ListItemButton component={Link} href="Portfolio&Investment">
        <ListItemText primary="Portfolio & Investment" />
      </ListItemButton>
      <ListItemButton component={Link} href="settings">
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton component={Link} href="inbox" >
        <ListItemText primary="Inbox" />
      </ListItemButton>
      {/* Login/Logout Button */}
      <ListItemButton
        onClick={() =>
          session
            ? signOut({ callbackUrl: "/login" }) 
            : signIn("google", { callbackUrl: "/" }) 
        }
      >
        <ListItemText
          primary={session ? "Logout" : "Login with Google"} 
        />
      </ListItemButton>
    </List>
  </Box>
</Drawer>

    </>
  );
}
