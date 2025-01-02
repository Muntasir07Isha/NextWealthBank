"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Select, MenuItem } from "@mui/material";
import Transactions from "./components/Transaction"; 

type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  username: string;
  pending:Number;
};

export default function ViewAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch accounts from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data: Account[] = await response.json();
        setAccounts(data);
        setSelectedAccount(data[0]); 
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
      <Box sx={{ padding: "34px", maxWidth: "1200px", margin: "0 auto" , }} >
          <Box
               sx={{
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "24px",
                padding: "19px",
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: 1,
                backgroundColor:"darkgoldenrod"
               }}
          >
            {selectedAccount?(
              <>
              {/*account info */}
         <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between", 
                    alignItems: "center",
                    width: "100%", 
                    maxWidth: "400px", 
                    marginBottom: "16px",
                    color:"ghostwhite"
                  }}
         
         >   
                <Typography variant="h6" sx={{ fontWeight: "bold",marginRight:"20px" }}>
                    {selectedAccount.name}
                </Typography>                          
                <Typography>
                  Available: ${selectedAccount.availableBalance.toFixed(2)}
                </Typography>
                <Typography>Pending:${selectedAccount.pending.toFixed(2)}</Typography>
                <Typography> Balance:${selectedAccount.balance.toFixed(2)}</Typography>
         
          </Box>      
            {/*ACCOUNT DROPDOWN */}
                <Select
                  value={selectedAccount.id}
                  onChange={(e)=>
                    setSelectedAccount(accounts.find((acc)=>acc.id=== +e.target.value) || null)
                  }
                  fullWidth
                  sx={{
                    width: "600px", 
                    bgcolor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
               >
                  
                  {accounts.map((account)=>(
                    <MenuItem key={account.id} value={account.id}>
                        {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ):(
              <Typography>Loading accounts...</Typography>
            )}
          </Box>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ marginBottom: "16px" }}>
            <Tab label="Transactions" />
            <Tab label="Statements" />
            <Tab label="Account Settings" />
          </Tabs>
          <Box>
  {activeTab === 0 && selectedAccount && <Transactions accountId={selectedAccount.id} />}
  {activeTab === 1 && <Typography>Statements Content</Typography>}
  {activeTab === 2 && <Typography>Account Settings Content</Typography>}
          </Box>

      </Box>
  );
}
