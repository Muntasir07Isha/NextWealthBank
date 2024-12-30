import { NextResponse } from "next/server";

type Account = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
};

const accounts: Account[] = [
  {
    id: 1,
    name: "Smart Access",
    accountNumber: "046-660 1089 8201",
    balance: 8616.5,
    availableBalance: 8441.69,
  },
  {
    id: 2,
    name: "StepPay",
    accountNumber: "5481 7190 0678 3171",
    balance: 0.0,
    availableBalance: 600.0,
  },
];

export async function GET() {
  return NextResponse.json(accounts);
}
