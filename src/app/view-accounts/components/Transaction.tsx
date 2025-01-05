"use client";
import { Box, Typography, Table, TableHead, TableRow, Card, CardContent,
  Divider,TableCell, TableBody, TextField } from "@mui/material";
import { useState, useEffect } from "react";

type Transaction = {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance?: number;
  category: string;
};

type TransactionsProps = {
  accountId?: number;
  salaryTransaction?: Transaction | null;

};

export default function Transactions({ accountId,salaryTransaction }: TransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!accountId) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions?accountId=${accountId}`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Fail to fetch", error);
      }
    };

    fetchTransactions();
  }, [accountId]);

//add salary transaction on the list 
  useEffect(() => {
    if (salaryTransaction) {
      setTransactions((prev) => [salaryTransaction, ...prev]); 
    }
  }, [salaryTransaction]);

  if (!accountId) {
    return <Typography>Please select an account</Typography>;
  }

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Box>
      <TextField
        variant="standard"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px", 
          display:{xs:"block", sm:"none"},
        }}
        placeholder="Search Transaction"
      />
      {/* Transaction Table */}
      <Table sx={{
          display: { xs: "none", sm: "table" },
      }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Debit</TableCell>
            <TableCell>Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                {transaction.debit > 0 ? `$${transaction.debit.toFixed(2)}` : "-"}
              </TableCell>
              <TableCell sx={{
                  color:
                    transaction.description === "Salary Deposit" ? "green" : "inherit",
                  fontWeight:
                    transaction.description === "Salary Deposit" ? "bold" : "normal",
                }}>
                {transaction.credit > 0 ? `$${transaction.credit.toFixed(2)}` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        {filteredTransactions.map((transaction, index) => (
          <Card key={index} sx={{ boxShadow: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {transaction.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transaction.date}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Debit: ${transaction.debit.toFixed(2)}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: transaction.credit > 0 ? "green" : "inherit",
                    fontWeight: transaction.credit > 0 ? "bold" : "normal",
                  }}
                >
                  Credit: ${transaction.credit.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>


      {filteredTransactions.length === 0 && <Typography>No Transaction Found</Typography>}
    </Box>
    <Box sx={{
      marginTop:"30px",
      color:"goldenrod"
     
    }}>
        <Typography sx={{bgcolor:"ghost white"}}
        
        >Your Transactions End here</Typography>
    </Box>
    </>
  );

}
