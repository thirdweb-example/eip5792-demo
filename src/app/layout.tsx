import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

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
          <main className="p-4 flex flex-col pb-10 min-h-[100vh] items-center justify-center container max-w-screen-lg mx-auto">
            <Header />
            {children}
            <footer className="border-t w-full flex items-center justify-center md:justify-end px-4 border-zinc-400/50 p-4 text-sm text-zinc-400 text-center max-w-7xl mx-auto">
              <Link
                href="https://github.com/thirdweb-example/eip5792-demo"
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <GithubIcon className="w-4 h-4 mr-1" /> Fork this project on
                GitHub
              </Link>
            </footer>
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
