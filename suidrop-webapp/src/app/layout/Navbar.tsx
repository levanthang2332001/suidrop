'use client'
import { MoonIcon } from '@/components/ui/moon';
import React, { useEffect, useState } from 'react';
import { ConnectButton, ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import Karma from '../components/karma/karma';


interface Link {
  label: string;
  href: string;
}

const links: Link[] = [
  { label: "Home", href: "/" },
  { label: "Ecosystems", href: "/ecosystems" },
  { label: "Explore", href: "/explore" },
  { label: "Launch Quests", href: "/launch/quest" },
]

export default function Navbar() {

  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const [open, setOpen] = useState(false);

  const sliceAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  }

  return (
    <header className="w-full flex justify-center pt-6 pb-4">
      <nav className="w-full max-w-11/12 bg-white rounded-2xl border border-[#f3ede7] shadow-sm flex items-center p-3 gap-4 relative">
        <div className="flex items-center gap-2 mr-10">
          <div className="w-9 h-9 rounded-full bg-[#b8865b] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">☼</span>
          </div>
          <span className="font-semibold text-xl text-[#2d2217]">SuiDrop</span>
        </div>
        <ul className="hidden lg:flex gap-8 text-[#2d2217] font-medium flex-1 justify-center text-base">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-[#b8865b] transition">{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-2 ml-6">
          <Karma />
          <button className="p-2 rounded hover:bg-[#f5eee7] text-xl transition"><MoonIcon /></button>
          <ConnectModal
            trigger={
              <Button
                className="ml-2 px-5 py-2 rounded-lg cursor-pointer bg-[#b8865b] text-white font-semibold hover:bg-[#a97a4a] transition flex items-center gap-2 shadow"
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

        </div>
        <div className="flex lg:hidden flex-1 justify-end">
          <button className="p-2 rounded hover:bg-[#f5eee7] transition" aria-label="Open menu">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2d2217]" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

