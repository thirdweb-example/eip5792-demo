import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EIP-5792 with thirdweb SDK",
  description: "Use EIP-5792 with the thirdweb SDK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <Toaster
            toastOptions={{
              className:
                "!bg-zinc-950 !border !border-zinc-800 !rounded-md !text-white",
            }}
          />
          <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <Header />
            {children}
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
