import { NextResponse } from "next/server";

type Recipient = {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
};

const recipients: Recipient[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    accountNumber: "732-718 6982 29",
    bankName: "Westpac Banking Corporation",
  },
  {
    id: 2,
    name: "Lionel Messi",
    accountNumber: "062-185 1100 7097",
    bankName: "Commonwealth Bank of Australia",
  },
  {
    id: 3,
    name: "Neymar Jnr",
    accountNumber: "112-879 4891 11856",
    bankName: "St. George Bank",
  },
  {
    id: 4,
    name: "Mbappe",
    accountNumber: "112-879 4891 11856",
    bankName: "Regional Bank",
  },
  {
    id: 5,
    name: "Vinicius Jnr",
    accountNumber: "112-879 4891 11856",
    bankName: "NAB BANK",
  },
  

];

export async function GET() {
  return NextResponse.json(recipients);
}
