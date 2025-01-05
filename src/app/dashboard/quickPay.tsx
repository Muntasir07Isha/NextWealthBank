"use client";
import { Box, MenuItem, Select, Typography,TextField,Button,Snackbar,Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccounts } from "@/context/AccountContext";

type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
};


type QuickPayProps = {
  accounts: Account[];
  onTransaction: (firstAccount:string,amount:number,) => void;
}
  

export default function QuickPay() {
  const { accounts, updateAccountBalance } = useAccounts();
  const [formAccount, setFormAccount] = useState<string>("");
  const [toAccount, setToAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

const handleNotification  = (message:string, severity:"info" | "success" | "error") => {
  setNotification({ open: true, message, severity });

}

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

    // Deduct  amount
    const fromAccount = accounts.find((account) => account.name === formAccount);
    if (fromAccount) {
      updateAccountBalance(fromAccount.id, -amountNumber);
    }


    const toAccountObj = accounts.find((account) => account.name === toAccount);
    if (toAccountObj) {
      updateAccountBalance(toAccountObj.id, amountNumber);
    }

    handleNotification(`Transferred $${amount} from ${formAccount} to ${toAccount}`, "success");
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
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
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
)
}