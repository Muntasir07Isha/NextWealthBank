"use client";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";
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
    <Box>
      <TextField
        variant="standard"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      {/* Transaction Table */}
      <Table>
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
      {filteredTransactions.length === 0 && <Typography>No Transaction Found</Typography>}
    </Box>
  );
}
