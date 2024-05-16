export default function Resources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="EIP-5792"
        href="https://eips.ethereum.org/EIPS/eip-5792"
        description="A standard for sending multiple calls from the user's wallet."
      />

      <ArticleCard
        title="Coinbase Smart Wallet"
        href="https://www.coinbase.com/wallet/smart-wallet"
        description="An EIP5792-compliant wallet by Coinbase."
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Start building with EIP-5792 on thirdweb."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
