import Resources from "@/components/Resources";
import Title from "@/components/Title";
import Transactions from "@/components/Transactions";

export default function Home() {
  return (
    <div className="h-full my-32 items-center gap-16 justify-center flex flex-col">
      <Title />

      <Transactions />

      <div className="w-full h-[1px] opacity-20 bg-zinc-200" />

      <Resources />
    </div>
  );
}
