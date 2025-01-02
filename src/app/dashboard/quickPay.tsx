"use client";
import { Box, MenuItem, Select, Typography,TextField,Button } from "@mui/material";
import { useEffect, useState } from "react";

type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
};

type Recipient = {
    id: number;
    name: string;
  };
type QuickPayProps = {
  accounts: Account[];
  onTransaction: (firstAccount:string,amount:number) => void;
}
  

export default function QuickPay({ accounts, onTransaction }: QuickPayProps){
  const [formAccount, setFormAccount] = useState<string>("");
  const [toAccount, setToAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    if (!formAccount || !toAccount || !amount) {
      alert("Please fill out all fields");
      return;
    }
    if (formAccount === toAccount) {
      alert("Cannot transfer to the same account");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Enter a valid amount");
      return;
    }

    onTransaction(formAccount, amountNumber);
    alert(`Transferred $${amount} from ${formAccount} to ${toAccount}`);

 
    setFormAccount("");
    setToAccount("");
    setAmount("");
  };


return(
    <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
        QuickPay
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          From
        </Typography>
        <Select
             value={formAccount}
             onChange={(e) => setFormAccount(e.target.value)}
             fullWidth
        >
        <MenuItem value="">Select Account</MenuItem>
            {accounts.map((account)=>(
                <MenuItem key={account.id} value={account.name}>
                    {account.name}
                </MenuItem>
            ))}
        </Select>
      </Box>
                  {/* To Dropdown */}
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          To
        </Typography>
        <Select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Select recipient</MenuItem>
          <MenuItem value="Recipient 1">Recipient 1</MenuItem>
          <MenuItem value="Recipient 2">Recipient 2</MenuItem>
        </Select>
      </Box>

      {/* Amount Input */}
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          Amount
        </Typography>
        <TextField
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#E7B649",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#b3e09d",
          },
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
)
}