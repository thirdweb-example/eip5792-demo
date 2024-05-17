import React from "react";
import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import MintButton from "./MintButton";

export default function Header() {
  return (
    <div className="flex fixed top-0 w-screen">
      <div className="max-w-7xl lg:px-8 px-4 flex w-full items-center justify-between mx-auto">
        <Image
          src={thirdwebIcon}
          alt=""
          className="size-[75px] md:size-[75px]"
          style={{
            filter: "drop-shadow(0px 0px 24px #a726a9ff)",
          }}
        />

        <div className="p-4">
          <MintButton />
        </div>
      </div>
    </div>
  );
}
