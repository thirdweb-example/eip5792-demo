import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { client } from "./client";

export const CHAIN = baseSepolia;

export const DEMO_TOKEN = getContract({
  address: "0x8CF8353Ac085f49F2c10B1b99FAe97A127514613",
  chain: CHAIN,
  client,
});

export const NFT = getContract({
  address: "0xf0D2Aa7B07BD1069A5C3B69fd0620b31AbA9ED1C",
  chain: CHAIN,
  client,
});
