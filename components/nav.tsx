import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex flex-row justify-between items-center px-10 py-3">
      <Link href="/">
        <h1 className="text-2xl font-extrabold uppercase">Token Swoosh</h1>
      </Link>
      <Link href="/about" className="font-bold ml-auto mr-5">
        Contract dets
      </Link>
      <ConnectButton />
    </nav>
  );
}
