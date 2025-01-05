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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useEffect } from "react";
import { useAccounts } from "@/context/AccountContext";

type Recipient = {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
};

export default function TransfersBPAY() {
  const { accounts } = useAccounts();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [fromAccountId, setFromAccountId] = useState<number | null>(null);
  const [toRecipientId, setToRecipientId] = useState<number | null>(null);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);

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
      alert("Please fill in all fields");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    alert(`Transferred $${amount} successfully`);
  };

  const handleDeleteRecipient = (id: number) => {
    setRecipients((prev) => prev.filter((recipient) => recipient.id !== id));
  };

  return (
    <Box>
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
        {/* From Dropdown */}
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

        {/* To Dropdown */}
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
  );
}
