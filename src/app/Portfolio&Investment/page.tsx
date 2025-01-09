"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import ChartsPage from "../Charts/ChartPage";
import Stocks from "./Investment";

const Page = () => {
  return (
    <Box sx={{ padding: "32px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "32px",
          color: "#333",
        }}
      >
        Portfolio and Investment
      </Typography>

      {/* Charts Section */}
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "12px",
        }}
      >
        <ChartsPage />
      </Box>

      {/* Investment Section */}
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stocks />
      </Box>
    </Box>
  );
};

export default Page;