"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { mockStocks } from "@/utils/mockStockData";


const Stocks = () =>{
    return (
        <Box sx={{ marginTop: "32px", padding: "16px"  }}>
             <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "24px", textAlign: "center", color:"goldenrod" }}>
                Investment Opportunities
             </Typography>

        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}>
            {mockStocks.map((stock)=>{
                const change = parseFloat(stock.change); //converting number
                const percentage = parseFloat(stock.percentage); // converting for comparision
                return(
                    <Card
                        key={stock.symbol}
                        sx={{
                            width: "250px",
                            padding: "16px",
                            backgroundColor:"ghost white",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            border: `4px solid ${change > 0 ? "green" : "red"}`,
                        }}                                            
                    >
          <Image
                src={`/stocks/${stock.symbol.toLowerCase()}.png`}
                alt={`${stock.symbol} logo`}
                width={84}
                height={84}
                style={{
                  marginBottom: "16px",
                  borderRadius: "50%",
                }}
              />
                <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {stock.symbol}
                </Typography>
                <Typography>Price: ${stock.price}</Typography>
                <Typography
                  sx={{
                    color: change > 0 ? "green" : "red",
                    fontWeight: "bold",
                    marginTop: "8px",
                  }}
                >
                  {change > 0 ? "▲" : "▼"} {change.toFixed(2)} ({percentage.toFixed(2)}%)
                </Typography>
                </CardContent>

                    </Card>
                )
            })}

        </Box>
        </Box>
    )
}
export default Stocks