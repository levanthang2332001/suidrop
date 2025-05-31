"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

const links = [
  { label: "Home", href: "/" },
  { label: "Airdrop", href: "/airdrop" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Explore", href: "/explore" },
  { label: "Launch MemeCoin", href: "/memecoin" },
];

export function Navbar() {

  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const [open, setOpen] = useState(false);

  const sliceAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  }

  return (
    <div className="fixed top-0 z-50 w-full px-6 py-4">
      <nav className="flex items-center justify-between px-8 py-3 mx-auto bg-white shadow-sm max-w-7xl rounded-2xl">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/gold-coin.png" alt="MemeCoin" width={40} height={40} />
          <span className="text-2xl font-bold text-black">SuiDrop</span>
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="font-sans font-semibold text-black transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
        <ConnectModal
          trigger={
            <Button
              className="ml-2 px-5 py-2 stroke-black rounded-lg cursor-pointer bg-[#b8865b] text-white font-semibold hover:bg-[#a97a4a] transition flex items-center gap-2 shadow"
              onClick={() => {
                if (currentAccount) {
                  disconnect();
                }
              }}
            >
              {currentAccount ? sliceAddress(currentAccount.address) : 'Connect Wallet'}
            </Button>
          }
          open={open}
          onOpenChange={(isOpen) => {
            if (!currentAccount) {
              setOpen(isOpen);
            }
          }}
        />
      </nav>
    </div>
  );
} 