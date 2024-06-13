import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Request received", request);
  const searchParams = request.nextUrl.searchParams;
  const chainId = searchParams.get("chainId");
  const clientId = searchParams.get("clientId");
  const data = await request.json();
  console.log("Request body", data);
  const res = await fetch(
    `https://${chainId}.bundler.thirdweb.com/${clientId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "x-secret-key": process.env.SECRET_KEY!,
      },
    }
  );
  console.log("Paymaster result", res);
  return res;
}
