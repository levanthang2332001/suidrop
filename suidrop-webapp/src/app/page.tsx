"use client";

import { Navbar } from "@/components/navbar";
import TextCursor from "@/components/ui/TextCursor/TextCursor";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D4C6B] pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 px-6 py-20 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white outlined-text lg:text-7xl">
                MemeCoin
                <br />
                <span className="text-white">is Here!</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-[#FFD700] font-medium mb-12">
                A new way to smile
                <br />
                while you invest
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/airdrop"
                  className="bg-[#FFC107] hover:bg-[#FFB300] text-dark px-8 py-3 rounded-xl font-medium text-lg transition flex items-center justify-center gap-2 hover-scale"
                >
                  <span>🚀</span>
                  Get Free Coins
                </Link>
                <Link
                  href="/explore"
                  className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-8 py-3 rounded-xl font-medium text-lg transition text-center hover-scale"
                >
                  Explore Ecosystem
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF5722] blur-3xl opacity-20 -z-10"></div>
              <Image
                src="/memecoin-character.png"
                alt="MemeCoin Mascot"
                width={500}
                height={500}
                className="w-full max-w-md mx-auto animate-float"
              />
              <Image
                src="/gold-coin.png"
                alt="Stack of coins"
                width={200}
                height={100}
                className="absolute bottom-0 right-0 w-32 animate-float"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
