"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Select, MenuItem, Button, Snackbar,Alert} from "@mui/material";
import Transactions from "./components/Transaction";
import { useAccounts } from "@/context/AccountContext";
import { Balance } from "@mui/icons-material";

type Transaction = {
  date: string;
  description: string;
  debit: number;
  credit: number;
  category: string;
  balance?:number

};


export default function ViewAccountsPage() {
  const { accounts, updateAccountBalance } = useAccounts();
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [salaryTransaction, setSalaryTransaction] = useState<Transaction | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  useEffect(() => {
    if (accounts.length > 0 && selectedAccountId === null) {
      setSelectedAccountId(accounts[0].id); // Set the first account ID by default
    }
  }, [accounts, selectedAccountId]);

  const selectedAccount = accounts.find((account) => account.id === selectedAccountId);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleReceiveSalary = () => {
    if (selectedAccountId) {
      updateAccountBalance(selectedAccountId, 4000); 
    
      const newSalaryTransaction = {
        date: new Date().toISOString().split("T")[0], 
        description: "Salary Deposit",
        debit: 0,
        credit: 4000,
        category: "Income",
        Balance:0,
     
      };
      setSalaryTransaction(newSalaryTransaction);
      setNotification({
        open: true,
        message: `Salary of $4000 has been added to ${selectedAccount?.name}`,
        severity: "success",
      });
    }
  };

  if (!accounts.length) {
    return <Typography>Loading accounts...</Typography>;
  }

  return (
    <Box sx={{ padding: "34px", maxWidth: "1200px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
          padding: { xs: "10px", sm: "19px" },
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 1,
          backgroundColor: "darkgoldenrod",
          textAlign: "center",
        }}
      >
        {selectedAccount ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
                marginBottom: "16px",
                color: "ghostwhite",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: "20px" }}>
                {selectedAccount.name}
              </Typography>
              <Typography>Available: ${selectedAccount.availableBalance.toFixed(2)}</Typography>
              <Typography>Pending: ${selectedAccount.pending.toFixed(2)}</Typography>
              <Typography>Balance: ${selectedAccount.balance.toFixed(2)}</Typography>
            </Box>
            <Select
              value={selectedAccountId || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  setSelectedAccountId(+value); // Use "+" to cast to a number
                }
              }}
              fullWidth
              sx={{
                width: "300px",
                margin:"0 auto",
                bgcolor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
     
            <Button
              variant="contained"
              onClick={() => handleReceiveSalary()}
              sx={{ marginTop: "16px", bgcolor: " darkcyan", color: "white",border:"2px solid gold",}}
            >
              Receive Salary
            </Button>
          </>
        ) : (
          <Typography>Loading accounts...</Typography>
        )}
      </Box>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ marginBottom: "16px" }}>
        <Tab label="Transactions" />
        <Tab label="Statements" />
        <Tab label="Account Settings" />
      </Tabs>
      <Box>
        {activeTab === 0 && selectedAccount && (
          <Transactions accountId={selectedAccount.id} 
          salaryTransaction={salaryTransaction || undefined}
          />
        )}
        {activeTab === 1 && <Typography>Statements Content</Typography>}
        {activeTab === 2 && <Typography>Account Settings Content</Typography>}
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity as "success" | "error" | "info"}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
