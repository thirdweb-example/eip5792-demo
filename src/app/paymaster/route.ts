import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chainId = searchParams.get("chainId");
  const clientId = searchParams.get("clientId");
  const data = await request.json();
  const res = await fetch(
    `https://${chainId}.bundler.thirdweb.com/${clientId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: request.headers,
    }
  );
  return res;
}
