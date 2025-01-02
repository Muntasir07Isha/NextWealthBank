"use client";

import { Box, Typography, Link, Button } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f3f4f6", // Light grey background
        padding: "24px 36px", // Spacing for inner content
        borderTop: "2px solid #ddd", // Subtle top border
        marginTop: "40px",
        display: "flex",
        flexDirection: "column", // Stack content vertically
        alignItems: "center", // Center-align content
        gap: "24px", // Space between sections
      }}
    >
      {/* Links Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on larger
          justifyContent: "center",
          gap: "32px", // Space between links
        }}
      >
        <Link
          href="/privacy"
          sx={{
            color: "#0073e6",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          sx={{
            color: "#0073e6",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Terms of Service
        </Link>
        <Link
          href="/about"
          sx={{
            color: "#0073e6",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          About Us
        </Link>
      </Box>

      {/* Feedback Section */}
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "600px", // Restrict width for better readability
          margin: "0 auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
         NextWealth Bank is a Demo Bank App, Purpose of it too demontrates handling complex Calculations and UI with my Front End Skills.
        </Typography>

      </Box>

      {/* Footer Bottom */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textAlign: "center" }}
      >
        © 2025 BankApp. All Rights Reserved. | Find a
        Branch | Financial Assistance | Contact Us
      </Typography>
    </Box>
  );
}
