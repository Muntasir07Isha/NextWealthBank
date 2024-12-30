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
  

export default function QuickPay(){
  const [accounts, setAccounts] = useState<Account[]>([])
  const [formAccount, setFormAccount] = useState<string>("");
  const [toAccount, setToAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);

    useEffect(()=>{
        const fetchAccounts = async()=>{
         try{
            const response = await fetch("/api/accounts")
            if(!response.ok){
                throw new Error("Server error")
            }
            const data: Account[] = await response.json();
            setAccounts(data);
         } catch(error){
            console.error("Fail to fetch accounts", error)
         }
        }
        fetchAccounts()
    }, [])

//fetch reciptents from mock data
useEffect(() => {
    const fetchRecipients = async () => {
      try {
        // Mock API or hardcoded recipients
        const mockRecipients: Recipient[] = [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ];
        setRecipients(mockRecipients);
      } catch (error) {
        console.error("Failed to fetch recipients:", error);
      }
    };

    fetchRecipients();
  }, []);

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
          {recipients.map((recipient) => (
            <MenuItem key={recipient.id} value={recipient.name}>
              {recipient.name}
            </MenuItem>
          ))}
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
          backgroundColor: "#D1FFBD",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#b3e09d",
          },
        }}
        onClick={() => {
          if (!formAccount || !toAccount || !amount) {
            alert("Please fill out all fields");
            return;
          }
          if (formAccount === toAccount) {
            alert("Cannot transfer to the same account");
            return;
          }
          alert(`Transferred $${amount} from ${formAccount} to ${toAccount}`);
        }}
      >
        Submit
      </Button>


    </Box>


)

}