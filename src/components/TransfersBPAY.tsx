"use client";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useEffect } from "react";
import { useAccounts,} from "@/context/AccountContext";

type Recipient = {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
};

export default function TransfersBPAY() {
  const { accounts,transferBetweenAccounts } = useAccounts();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [fromAccountId, setFromAccountId] = useState<number | null>(null);
  const [toRecipientId, setToRecipientId] = useState<number | null>(null);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");


  // Fetch recipients dynamically
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await fetch("/api/recipients");
        if (!response.ok) throw new Error("Failed to fetch recipients");
        const data: Recipient[] = await response.json();
        setRecipients(data);
      } catch (error) {
        console.error("Error fetching recipients:", error);
      }
    };

    fetchRecipients();
  }, []);

  const handleTransfer = () => {
    if (!fromAccountId || !toRecipientId || !transferAmount) {
      showSnackbar("Please fill in all fields","error");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      showSnackbar("Enter a valid amount","error");
      return;
    }

//use global context
transferBetweenAccounts(fromAccountId,toRecipientId,amount);


    showSnackbar(`Transferred $${amount} successfully`,"success");
  };

  const handleDeleteRecipient = (id: number) => {
    setRecipients((prev) => prev.filter((recipient) => recipient.id !== id));
    showSnackbar("Recipient deleted successfully", "error");
  };

const showSnackbar = (message: string, severity: "success" | "error") => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};
const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };




  return (
<Box sx={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"100vh",
  bgcolor:"#f5f5f5"
}}>

    <Box sx={{
      width: "1300px", 
      bgcolor: "white", 
      boxShadow: 3,
      borderRadius: "8px", 
      overflow: "hidden",

    }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "Goldenrod",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          Transfers & BPAY
        </Typography>
      </Box>

      {/* Form Section */}
      <Box sx={{ padding: "16px", bgcolor: "#fff", borderRadius: "8px" }}>
    
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            From
          </Typography>
          <Select
            value={fromAccountId || ""}
            onChange={(e) => setFromAccountId(Number(e.target.value))}
            fullWidth
          >
            <MenuItem value="">Select Account</MenuItem>
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name} - {account.accountNumber} (Available: $
                {account.availableBalance.toFixed(2)})
              </MenuItem>
            ))}
          </Select>
        </Box>


        <Box sx={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
              To
            </Typography>
            <Select
              value={toRecipientId || ""}
              onChange={(e) => setToRecipientId(Number(e.target.value))}
              fullWidth
            >
              <MenuItem value="">Select Recipient</MenuItem>
              {recipients.map((recipient) => (
                <MenuItem key={recipient.id} value={recipient.id}>
                  {recipient.name} - {recipient.accountNumber} ({recipient.bankName})
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Amount Input */}
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Amount
          </Typography>
          <TextField
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: "#E7B649", color: "black", fontWeight: "bold" }}
          onClick={handleTransfer}
        >
          Transfer
        </Button>
      </Box>
 
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ marginTop: "16px", bgcolor: "#fff", borderRadius: "8px" }}
      >
        <Tab label="All" />
        <Tab label="Bank Accounts" />
      </Tabs>

      {/* Recipient List */}
      <Box sx={{ marginTop: "16px", bgcolor: "#fff", borderRadius: "8px", padding: "16px" }}>
        {recipients.map((recipient) => (
          <Box
            key={recipient.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Typography variant="body1">
              {recipient.name} - {recipient.accountNumber} ({recipient.bankName})
            </Typography>
            <IconButton onClick={() => handleDeleteRecipient(recipient.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
</Box>

  );
}
