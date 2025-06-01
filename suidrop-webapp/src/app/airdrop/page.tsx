import { Navbar } from "@/components/navbar";
import Image from "next/image";
import React from "react";

const Airdrop = () => {
  return (
    <div>
      <Navbar  />
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-70 blur-sm"
        />
      </div>
    </div>
  );
};

export default Airdrop;