"use client";

import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClientNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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

          {/* Right Side (Search and Icons for Desktop) */}
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
            <IconButton color="inherit">
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
                <Typography variant="button" sx={{ color: "black" }}>
                  My Home
                </Typography>
              </Link>
            </Box>
            <Link href="/view-accounts">
              <Typography variant="button" sx={{ color: "black", cursor: "pointer" }}>
                View Accounts
              </Typography>
            </Link>
            <Link href="Transfers&BPAY">
            <Typography variant="button" sx={{ color: "black" }}>
              Transfers & BPAY
            </Typography>
            </Link>
            <Typography variant="button" sx={{ color: "black" }}>
              Offers & Apply
            </Typography>
            <Typography variant="button" sx={{ color: "black" }}>
              Settings
            </Typography>
            <Typography variant="button" sx={{ color: "black" }}>
              Inbox
            </Typography>
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
              <ListItemText primary="Transfers&BPAY" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Offers & Apply" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
