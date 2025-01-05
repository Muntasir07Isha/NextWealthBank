"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  updateAccountBalance: (accountId: number, amount: number) => void; // Update balance for a specific account
  transferBetweenAccounts: (fromAccountId: number, toAccountId: number, amount: number) => void;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

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
  )
}

  return (
    <AccountContext.Provider value={{ accounts, updateAccountBalance, transferBetweenAccounts }}>
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
