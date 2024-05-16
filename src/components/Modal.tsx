import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Button,
  Input,
} from "@headlessui/react";
import { useState } from "react";
import { Address, getAddress, toWei } from "thirdweb";

import DropdownMenu from "./DropdownMenu";
import toast from "react-hot-toast";

export default function Modal(props: {
  isOpen: boolean;
  close: () => void;
  tokens: { label: string; icon: React.ReactNode }[];
  addTransaction: (tx: { to: Address; value: bigint; token: number }) => void;
}) {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [token, setToken] = useState(0);

  return (
    <Transition appear show={props.isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={props.close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-lg font-medium text-white">
                  Add a transaction
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  Transactions will be batched and sent together using Coinbase
                  Smart Wallet.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!to || !value) {
                      toast.error("Please fill out all fields", {
                        id: "error",
                      });
                      return;
                    }
                    try {
                      getAddress(to);
                    } catch (e) {
                      toast.error("Invalid address", {
                        id: "error",
                      });
                      return;
                    }
                    props.addTransaction({
                      to: getAddress(to),
                      value: toWei(value),
                      token: token,
                    });
                    props.close();
                    setTo("");
                    setValue("");
                    setToken(0);
                  }}
                >
                  <div className="flex flex-col gap-2 my-4">
                    <div className="flex gap-1 flex-col">
                      <label className="pl-1 text-xs font-semibold">Send</label>
                      <div className="flex gap-2 justify-stretch">
                        <Input
                          value={value}
                          type="number"
                          placeholder="100"
                          className="border-zinc-800 rounded-lg flex-1 px-3 py-2 placeholder:text-zinc-700 bg-white/5 border focus:ring-zinc-700 focus:ring-2 focus:ring-inset"
                          onChange={(e) => setValue(e.target.value)}
                        />

                        <DropdownMenu
                          selected={token}
                          options={props.tokens}
                          setSelected={setToken}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <label className="pl-1 text-xs font-semibold">To</label>
                      <Input
                        value={to}
                        placeholder="0x000..."
                        className="border-zinc-800 rounded-lg w-full px-3 py-2 placeholder:text-zinc-700 bg-white/5 border focus:ring-zinc-700 focus:ring-2 focus:ring-inset"
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2 justify-end">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-2.5 px-4 text-base font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={props.close}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-md bg-zinc-200 py-2.5 px-4 text-base font-semibold text-zinc-800 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-300 data-[open]:bg-zinc-400 data-[focus]:outline-1 data-[focus]:outline-zinc-950"
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
