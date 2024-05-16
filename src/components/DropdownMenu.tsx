import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function DropdownMenu<T>({
  selected,
  options,
  setSelected,
}: {
  selected: number;
  options: { label: string; icon: React.ReactNode }[];
  setSelected: (selected: number) => void;
}) {
  return (
    <Menu>
      <MenuButton className="inline-flex w-32 items-center gap-2 rounded-md bg-zinc-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-700 data-[open]:bg-zinc-700 data-[focus]:outline-1 data-[focus]:outline-white">
        <div className="flex w-full gap-2 items-center">
          {options[selected].icon}
          {options[selected].label}
        </div>
        <ChevronDownIcon className="size-4 fill-white/20" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="z-20 w-32 translate-y-2 origin-top-right rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          {options.map((option, idx) => (
            <MenuItem key={idx}>
              <button
                onClick={() => setSelected(idx)}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                {option.icon}
                {option.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
