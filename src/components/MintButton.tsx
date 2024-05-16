"use client";
import { DEMO_TOKEN } from "@/contracts";
import React from "react";
import { readContract, toTokens } from "thirdweb";
import { balanceOf, mintTo } from "thirdweb/extensions/erc20";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

export default function MintButton() {
  const account = useActiveAccount();
  const { data: demoBalance, refetch } = useReadContract(balanceOf, {
    contract: DEMO_TOKEN,
    address: account?.address || "",
  });

  return (
    <div className="font-semibold flex-col-reverse md:flex-row flex gap-2 lg:gap-8 items-center">
      💥{toTokens(demoBalance || 0n, 18)} DEMO
      <TransactionButton
        disabled={!account}
        transaction={() => {
          return mintTo({
            contract: DEMO_TOKEN,
            to: account?.address || "",
            amount: 1000,
          });
        }}
        onTransactionConfirmed={() => {
          refetch();
        }}
        style={{
          borderRadius: "6px !important",
        }}
      >
        Mint DEMO
      </TransactionButton>
    </div>
  );
}
