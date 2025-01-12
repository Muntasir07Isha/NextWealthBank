import { NextResponse } from "next/server";

type Transaction = {
  id: number;
  accountId: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  category:string;
};

const transactions: Transaction[] = [
    {
        id: 1,
        accountId: 1,
        date: "2025-01-01",
        description: "Netflix Subscription",
        debit: 15.99,
        credit: 0,
        category:"Entertainment"
      },
      {
        id: 2,
        accountId: 1,
        date: "2025-01-02",
        description: "Salary Deposit",
        debit: 0,
        credit: 4000,
        category:"Income"
      },
      {
        id: 3,
        accountId: 1,
        date: "2025-01-03",
        description: "Amazon Purchase",
        debit: 120.49,
        credit: 0,
        category:"Shopping"
      },
      {
        id: 4,
        accountId: 1,
        date: "2025-01-04",
        description: "David Jones",
        debit: 500.0,
        credit: 0,
        category:"Shopping"

      },
      {
        id: 5,
        accountId: 2,
        date: "2025-01-04",
        description: "Woolworths Minto EFPOS",
        debit: 0,
        credit: 40.0,
        category:"Grocery"
      },
      {
        id: 6,
        accountId: 1,
        date: "2025-01-05",
        description: "Spotify Subscription",
        debit: 12.99,
        credit: 0,
        category:"Entertainment"
      },
      {
        id: 7,
        accountId: 1,
        date: "2025-01-06",
        description: "Utility Bill Payment",
        debit: 230.0,
        credit: 0,
        category:"Utility"
      },
      {
        id: 8,
        accountId: 1,
        date: "2025-01-07",
        description: "Grocery",
        debit: 85.67,
        credit: 0,
        category:"Grocery"
      },
      {
        id: 9,
        accountId: 1,
        date: "2025-01-08",
        description: "Rent",
        debit: 0,
        credit: 120.49,
        category:"Utility"
      },
      {
        id: 10,
        accountId: 1,
        date: "2025-01-09",
        description: "JB HIFI",
        debit: 1000.0,
        credit: 0,
        category:"Entertainment"
      },
      {
        id: 11,
        accountId: 1,
        date: "2025-01-19",
        description: "McDonalds",
        debit: 11.50,
        credit: 0,
        category:"eating out"
      },
      {
        id: 12,
        accountId: 1,
        date: "2025-01-29",
        description: "KFC",
        debit: 10,
        credit: 0,
        category:"eating out"
      },
      {
        id: 13,
        accountId: 1,
        date: "2025-01-29",
        description: "Stock",
        debit: 37.50,
        credit: 0,
        category:"Shopping"
      },
      {
        id: 14,
        accountId: 1,
        date: "2025-01-19",
        description: "Mac Book",
        debit: 1350.0,
        credit: 0,
        category:"Shopping"
      },
      {
        id: 15,
        accountId: 1,
        date: "2025-01-07",
        description: "Pizza Hut",
        debit: 11.45,
        credit: 0,
        category:"eating out"
      },
      {
        id: 16,
        accountId: 1,
        date: "2025-01-04",
        description: "Stock",
        debit: 175,
        credit: 0,
        category:"grocery"
      },
      {
        id: 17,
        accountId: 1,
        date: "2025-01-09",
        description: "Salary Deposit",
        debit: 0,
        credit: 4000,
        category:"Income"
      },


];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  //error handling
  if (accountId && isNaN(Number(accountId))) {
    return NextResponse.json(
      { error: "Invalid accountId provided" },
      { status: 400 }
    );
  }


  const filteredTransactions = accountId
    ? transactions.filter((transaction) => transaction.accountId === Number (accountId))
    : transactions;

//function for category in chart


  return NextResponse.json(filteredTransactions);
}
