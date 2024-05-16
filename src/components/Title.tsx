import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";

export default function Title() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center md:text-6xl font-semibold md:font-extrabold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-3"> 🤝 </span>
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#FF00A8] to-[#6200C6]">
          {" "}
          EIP-5792{" "}
        </span>
      </h1>

      <p className="text-zinc-300 text-base">
        Make sure you&apos;re using Coinbase Smart Wallet and have the browser
        extension disabled.
      </p>
    </div>
  );
}
