import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Nav({}) {
  return (
    <nav className="flex flex-row justify-between items-center px-10 py-3">
      <h1 className="text-2xl font-extrabold uppercase">Swouch Transfer</h1>
      <ConnectButton />
    </nav>
  );
}
