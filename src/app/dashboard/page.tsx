"use client"
import { Box, Typography, Button } from "@mui/material";
import QuickPay from "./quickPay";
import { useEffect,useState } from "react";


//define type
type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  username:string
}

export default function DashboardPage() {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [username, setUserName] = useState<string>("");


useEffect(()=>{
  const fetchAccounts = async () => {
    try{
      const response = await fetch("/api/accounts")
      if(!response.ok){
        throw new Error("Fail to fetch data")
      }
      const data:Account[] = await response.json()
      setAccounts(data)
      if(data.length>0){
        setUserName(data[0].username)
      }
    }catch{
      console.error("error fetching accounts",Error)
    }
  }
  fetchAccounts();
},[])

//HANDLE TRASNACTION
const handleTransaction = (fromAccountName: string, amount: number) => {
  setAccounts((prevAccounts) =>
    prevAccounts.map((account) => {
      if (account.name === fromAccountName) {
        return { ...account, balance: account.balance - amount, 
          availableBalance: account.availableBalance - amount };
      }
      return account;
    })
  );
};


//calculations
  const totalCredits = accounts.reduce((sum,account)=>sum+account.balance,0)
  const totalDebits  = 0
  const netPosition = totalCredits-totalDebits;

  
return (
<Box sx={{ position: "relative", marginTop: 0, width: "100%" ,}}>
  {/* Greeting Section */}
  <Box
    sx={{
      bgcolor: "#D1FFBD",
      padding: "66px 36px",
      boxSizing: "border-box",
      width: "100%",
      height: "150px",
      position: "relative",
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: "bolder", color: "black" }}>
      Good afternoon,{username || "User"}
    </Typography>
  </Box>

  {/* Layout for Main Content and QuickPay */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, 
      width: "100%",
      marginTop: 0, 
      maxWidth:"1350px",
      height:"auto",
      gap: 2,
      margin:"0 auto",
      padding:{ xs: "16px", md: "34px" }, 
 
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    }}
  >
    {/* Main Content */}
    <Box sx={{ 
        flex: 1, // Occupy space dynamically
        maxWidth: { xs: "100%", md: "65%" }, // 65% width for larger screens
        paddingRight: { md: "36px" }, // Add spacing between cards and QuickPay
       
    }}>

      {/* Cards Section */}
      <Box 
         sx={{
            display: "flex",
            flexDirection: "column",
            ap: 2,
            background: "white",
            }}
      >
       {/* Mapping Accounts */}
            {accounts.map((account)=>(
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
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "1.1rem", marginRight: "60px" }}
                  >
                    Balance: ${account.balance.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  >
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
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 1,
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <Button variant="text" color="info">
            Apply for a new product?
          </Button>
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            padding: "16px",
            boxShadow: 1,
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
      </Box>
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    bgcolor: "#f9f9f9", 
    marginTop:"10px"
    
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      color: "#333", // Darker text for better readability
    }}
  >
    Assets and Liabilities
  </Typography>
  <Button
    variant="text"
    sx={{
      color: "green",
      fontWeight: "bold",
      fontSize: "1rem",
      textTransform: "capitalize",
      "&:hover": {
        bgcolor: "#b3e09d", // Slightly darker shade on hover
        color: "white",
      },
    }}
  >
    View Portfolio
  </Button>
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
      <QuickPay  accounts={accounts} onTransaction={handleTransaction}/>
    </Box>
  </Box>
</Box>

  );
}
