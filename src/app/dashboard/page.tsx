import { Box, Typography, Button } from "@mui/material";
import QuickPay from "./quickPay";

export default function DashboardPage() {
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
      Good afternoon, Muntasir
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
          gap: 2,
          background: "white",
        }}
      >
        {/* Smart Access Card */}
        <Box
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
            <img src="/creditcard2.svg" alt="Smart Access" width={40} height={40} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Smart Access
            </Typography>
            <Typography variant="body2">046-660 1089 8201</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "1.1rem", marginRight: "60px" }}
            >
              Balance: $8,616.50
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              Available: $8,441.69
            </Typography>
          </Box>
        </Box>

        {/* StepPay Card */}
        <Box
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
            <img src="/creditcard1.svg" alt="StepPay" width={40} height={40} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              StepPay
            </Typography>
            <Typography variant="body2">5481 7190 0678 3171</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "1.1rem", marginRight: "60px" }}
            >
              Balance: $0.00
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              Available: $600.00
            </Typography>
          </Box>
        </Box>
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
            <Typography variant="h6">$8,616.50</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total Debits
            </Typography>
            <Typography variant="h6">$0.00</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Net Position
            </Typography>
            <Typography variant="h6">$8,616.50</Typography>
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
      <QuickPay />
    </Box>
  </Box>
</Box>

  );
}
