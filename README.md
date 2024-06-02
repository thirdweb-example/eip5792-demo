# EIP-5792 with thirdweb

## Example Usage

### `getCapabilities`

Returns the capabilities of the wallet according to EIP-5792.

```ts
import { getCapabilities } from "thirdweb/wallets/eip5792";

const capabilities = await getCapabilities({ wallet });
```

### `sendCalls`

Sends the given calls to the wallet for execution, and attempts to fallback to normal execution if the wallet does not support EIP-5792.

```ts
import { sendCalls } from "thirdweb/wallets/eip5792";

const transfer1 = transfer({
  contract: USDC_CONTRACT,
  amount: 5000,
  to: "0x33d9B8BEfE81027E2C859EDc84F5636cbb202Ed6",
});

const transfer2 = transfer({
  contract: USDT_CONTRACT,
  amount: 1000,
  to: "0x33d9B8BEfE81027E2C859EDc84F5636cbb202Ed6",
});

const bundleId = await sendCalls({
  wallet,
  client,
  calls: [transfer1, transfer2],
});
```

### `getCallsStatus`

Returns the status of the given bundle ID and the transaction receipts if completed.

```ts
import { getCallsStatus } from "thirdweb/wallets/eip5792";

const status = await getCallsStatus({ wallet, bundleId });
```

### `useSendCalls`
`useSendCalls` will automatically revalidate all reads from contracts that are interacted with.

```ts
import { useSendCalls } from "thirdweb/react";

const sendTx1 = approve({
  contract: USDT_CONTRACT,
  amount: 100,
  spender: "0x33d9B8BEfE81027E2C859EDc84F5636cbb202Ed6",
});
const sendTx2 = approve({
  contract: USDT_CONTRACT,
  amount: 100,
  spender: "0x2a4f24F935Eb178e3e7BA9B53A5Ee6d8407C0709",
});
const { mutate: sendCalls, data: bundleId } = useSendCalls({ client });
await sendCalls({
  wallet,
  client,
  calls: [sendTx1, sendTx2],
});
```

Await the bundle's full confirmation:

```ts
const { mutate: sendCalls, data: bundleId } = useSendCalls({
  client,
  waitForResult: true,
});
await sendCalls({
  wallet,
  client,
  calls: [sendTx1, sendTx2],
});
```

Sponsor transactions with a paymaster:

```ts
const { mutate: sendCalls, data: bundleId } = useSendCalls();
await sendCalls({
  client,
  calls: [sendTx1, sendTx2],
  capabilities: {
    paymasterService: {
      url: `https://${CHAIN.id}.bundler.thirdweb.com/${client.clientId}`,
    },
  },
});
```

### `useCapabilities`

```ts
import { useCapabilities } from "thirdweb/react";
const { data: capabilities, isLoading } = useCapabilities();
```
### `useCallsStatus`
```ts
import { useCallsStatus } from "thirdweb/react";
const { data: status, isLoading } = useCallsStatus({ bundleId, client });
```
