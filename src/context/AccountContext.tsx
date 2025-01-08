"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Transaction = {
  id: number;
  accountId: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  category: string;
};


type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  username: string;
  pending: number;
};

type AccountContextType = {
  accounts: Account[];
  transactions:Transaction[]
  updateAccountBalance: (accountId: number, amount: number) => void; // Update balance for a specific account
  transferBetweenAccounts: (fromAccountId: number, toAccountId: number, amount: number) => void;
 
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch accounts from the API on initial load
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data: Account[] = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);



  // Function to update account balances
  const updateAccountBalance = (accountId: number, amount: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              balance: account.balance + amount,
              availableBalance: account.availableBalance + amount,
            }
          : account
      )
    );
  };

  //trasfers between accounts
const transferBetweenAccounts = (fromAccountId: number, toAccountId: number, amount: number) => {
  setAccounts((prevAccounts)=>
    prevAccounts.map((account)=>{
      if (account.id===fromAccountId){
        return{
          ...account,
          balance: account.balance - amount,
          availableBalance: account.availableBalance - amount,
        }
      }else if(account.id === toAccountId){
        return {
          ...account,
          balance: account.balance + amount,
          availableBalance: account.availableBalance + amount,
        };
      }
      return account;
    })
  );

  setTransactions((prevTransactions) => [
    ...prevTransactions,
    {
      id: prevTransactions.length + 1,
      accountId: fromAccountId,
      date: new Date().toISOString().split("T")[0],
      description: "Transfer Out",
      debit: amount,
      credit: 0,
      category: "Transfer",
    },
    {
      id: prevTransactions.length + 2,
      accountId: toAccountId,
      date: new Date().toISOString().split("T")[0],
      description: "Transfer In",
      debit: 0,
      credit: amount,
      category: "Transfer",
    },
  ]);

}

  


  return (
    <AccountContext.Provider value={{ accounts,transactions, updateAccountBalance, transferBetweenAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountProvider");
  }
  return context;
};
