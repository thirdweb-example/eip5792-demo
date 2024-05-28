"use client";
import { client } from "@/client";

import { PlusCircledIcon } from "@radix-ui/react-icons";

import { useCallback, useState } from "react";
import { Address, prepareTransaction, toTokens } from "thirdweb";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { useSendCalls } from "thirdweb/wallets/eip5792";
import { createWallet } from "thirdweb/wallets";
import demoIcon from "@public/demo.png";
import ethIcon from "@public/eth.svg";
import twLogo from "@public/tw.png";
import Image from "next/image";
import Modal from "./Modal";
import { transfer } from "thirdweb/extensions/erc20";
import { DEMO_TOKEN, NFT, CHAIN } from "@/contracts";
import toast from "react-hot-toast";
import { useReadContract } from "thirdweb/react";
import { balanceOf, claimTo } from "thirdweb/extensions/erc721";

type Token = {
  label: string;
  icon: React.ReactNode;
};
const tokens: Token[] = [
  {
    label: "ETH",
    icon: <Image src={ethIcon} alt="ETH" width={20} height={20} />,
  },
  {
    label: "DEMO",
    icon: <Image src={demoIcon} alt="DEMO" width={20} height={20} />,
  },
];

export default function Transactions() {
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [rawCalls, setCalls] = useState<
    { to: Address; value: bigint; token: Token }[]
  >([]);
  const { data: nftBalance, isLoading: nftBalanceLoading } = useReadContract(
    balanceOf,
    {
      contract: NFT,
      owner: wallet?.getAccount()?.address || "",
    }
  );
  const { mutateAsync: sendCalls } = useSendCalls({ client });

  const addTransaction = useCallback(
    (tx: { to: Address; value: bigint; token: number }) => {
      setCalls((prev) => [...prev, { ...tx, token: tokens[tx.token] }]);
    },
    []
  );

  const execute = useCallback(async () => {
    if (!wallet || !account) return;

    const preparedCalls = rawCalls.map((call) => {
      if (call.token.label === "ETH") {
        return prepareTransaction({
          to: call.to,
          value: call.value,
          client,
          chain: CHAIN,
        });
      } else if (call.token.label === "DEMO") {
        return transfer({
          to: call.to,
          amountWei: call.value,
          contract: DEMO_TOKEN,
        });
      } else {
        toast.error("Invalid token");
        throw new Error("Invalid token");
      }
    });

    if (nftBalance !== undefined && nftBalance < 1n) {
      const mintTx = claimTo({
        contract: NFT,
        to: account.address,
        quantity: 1n,
      });
      preparedCalls.push(mintTx);
    }

    await sendCalls({
      wallet,
      calls: preparedCalls,
      capabilities: {
        paymasterService: {
          url: `https://${CHAIN.id}.bundler.thirdweb.com/${client.clientId}`,
        },
      },
    });
    setCalls([]);
  }, [wallet, rawCalls, account, sendCalls, nftBalance]);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        close={() => setModalOpen(false)}
        addTransaction={addTransaction}
        tokens={tokens}
      />
      <div className="flex w-full flex-col gap-8">
        <div className="flex gap-2 justify-center">
          <ConnectButton
            client={client}
            chain={CHAIN}
            wallets={[
              createWallet("com.coinbase.wallet", {
                walletConfig: { options: "smartWalletOnly" },
              }),
            ]}
            appMetadata={{
              name: "thirdweb SDK EIP-5792",
            }}
          />

          <button
            disabled={!wallet}
            onClick={execute}
            className="bg-zinc-200 hover:opacity-90 disabled:opacity-50 border transition-all text-lg text-black font-bold disabled:text-base disabled:font-normal py-2 px-8 rounded-xl"
          >
            Send Calls
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 justify-center">
          {!nftBalanceLoading &&
            nftBalance !== undefined &&
            nftBalance < 1n && (
              <div className="flex flex-col h-24 items-center justify-center border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
                <Image
                  src={twLogo}
                  alt="Thirdweb"
                  width={366}
                  height={221}
                  className="w-auto h-6 mb-2"
                />
                <h2 className="text-lg font-bold">Mint NFT</h2>
              </div>
            )}
          {rawCalls.map((call, idx) => (
            <TransactionCard key={idx} {...call} />
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="flex flex-col h-24 items-center justify-center border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
          >
            <PlusCircledIcon className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Add a transaction</h2>
          </button>
        </div>
      </div>
    </>
  );
}

function TransactionCard(props: { to: Address; value: bigint; token: Token }) {
  return (
    <div className="flex flex-col border border-zinc-800 p-4 rounded-lg items-center hover:bg-zinc-900 transition-colors hover:border-zinc-700">
      <h2 className="text-lg font-semibold mb-2">
        {shortenAddress(props.to, 8)}
      </h2>
      <p className="text-sm flex gap-1 items-center text-zinc-400">
        {props.token.icon}
        Sending {toTokens(props.value, 18)} {props.token.label}
      </p>
    </div>
  );
}
