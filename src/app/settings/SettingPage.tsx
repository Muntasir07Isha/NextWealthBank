"use client";

import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Switch } from "@mui/material";

const SettingsPage = () => {
  return (
    <Box
      sx={{
        padding: "32px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
          marginBottom: "24px",
        }}
      >
        Settings
      </Typography>

      {/* Settings Section */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Account Settings */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "goldenrod",
            marginBottom: "16px",
          }}
        >
          Account Settings
        </Typography>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingY: "8px",
            }}
          >
            <ListItemText primary="Enable Notifications" />
            <Switch defaultChecked color="primary" />
          </ListItem>

          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingY: "8px",
            }}
          >
            <ListItemText primary="Two-Factor Authentication" />
            <Switch color="primary" />
          </ListItem>
        </List>

        {/* Security Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "goldenrod",
            marginTop: "32px",
            marginBottom: "16px",
          }}
        >
          Security
        </Typography>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingY: "8px",
            }}
          >
            <ListItemText primary="Change Password" />
            <Typography variant="body2" sx={{ color: "goldenrod", cursor: "pointer" }}>
              Edit
            </Typography>
          </ListItem>

          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingY: "8px",
            }}
          >
            <ListItemText primary="Manage Trusted Devices" />
            <Typography variant="body2" sx={{ color: "goldenrod", cursor: "pointer" }}>
              Edit
            </Typography>
          </ListItem>

          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingY: "8px",
            }}
          >
            <ListItemText primary="Close Account" />
            <Typography variant="body2" sx={{ color: "red", cursor: "pointer" }}>
              Close
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SettingsPage;

