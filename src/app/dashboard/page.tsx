"use client";

import { Box, Typography, Button } from "@mui/material";
import QuickPay from "./quickPay";
import { useAccounts } from "@/context/AccountContext";

export default function DashboardPage() {
  const { accounts, updateAccountBalance } = useAccounts();
  const totalCredits = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalDebits = 0;
  const netPosition = totalCredits - totalDebits;

  // Handle transactions using the context
  const handleTransaction = (fromAccountId: number, amount: number) => {
    updateAccountBalance(fromAccountId, -amount); // Deduct the amount from the selected account
  };

  return (
    <Box sx={{ position: "relative", marginTop: 0, width: "100%" }}>
      {/* Greeting Section */}
      <Box
        sx={{
          bgcolor: "#E7B649",
          padding: "66px 36px",
          width: "100%",
          height: "150px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder", color: "black" }}>
          Good afternoon, {accounts[0]?.username || "User"}
        </Typography>
      </Box>

      {/* Layout for Main Content and QuickPay */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1350px",
          margin: "0 auto",
          padding: { xs: "16px", md: "34px" },
          gap: 2,
        }}
      >
        {/* Main Content */}
        <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "65%" } }}>
          {/* Accounts Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {accounts.map((account) => (
              <Box
                key={account.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #ddd",
                  bgcolor: "white",
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ marginRight: "16px" }}>
                  <img
                    src={account.name === "Smart Access" ? "/creditcard2.svg" : "/creditcard1.svg"}
                    alt={account.name}
                    width={40}
                    height={40}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {account.name}
                  </Typography>
                  <Typography variant="body2">{account.accountNumber}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontSize: "1.1rem", marginRight: "60px" }}>
                    Balance: ${account.balance.toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Available: ${account.availableBalance.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Totals Section */}
          <Box sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                bgcolor: "white",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: 1,
                borderRadius: "8px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Total Credits
                </Typography>
                <Typography variant="h6">${totalCredits.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Total Debits
                </Typography>
                <Typography variant="h6">${totalDebits.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Net Position
                </Typography>
                <Typography variant="h6">${netPosition.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      bgcolor: "#f9f9f9",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: 1,
    }}
  >
    <Button
      variant="text"
      href="apply for new product?" 
      sx={{
        backgroundColor: "#E7B649",
        color: "black",
        fontWeight: "bold",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#D6A639",
        },
      }}
    >
      Apply for a New Product
    </Button>

    <Button
      variant="contained"
      href="/view-portfolio" 
      sx={{
        backgroundColor: "#E7B649",
        color: "white",
        fontWeight: "bold",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#D6A639",
        },
      }}
    >
      View Portfolio
    </Button>
  </Box>
          </Box>
        </Box>

        {/* QuickPay Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            marginTop: { xs: "16px", md: 0 },
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: 2,
            borderRadius: "8px",
          }}
        >
          <QuickPay/>
        </Box>
      </Box>
    </Box>
  );
}
