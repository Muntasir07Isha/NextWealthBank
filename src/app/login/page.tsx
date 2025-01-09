"use client";

import { signIn } from "next-auth/react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
       <Image src="/BankLogo.webp" alt="logo" width={94} height={84} />
       </Box>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Welcome to Next WealthBank
      </Typography>
      <Button
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        sx={{
          backgroundColor: "#E7B649",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#D6A639",
          },
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}
