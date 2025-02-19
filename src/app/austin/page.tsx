"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";

export default function AustinPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center text-white mt-12">
      <LogoutButton />
      {/* Header Information */}
      <div className="mb-10 text-center">
        <p>[Open MON - SAT: 10am - 6pm]</p>
        <p>Delivery between 6-10pm</p>
        <p>*6:00pm cutoff for same-day delivery*</p>
        <p>$50 order minimum</p>
        <p>- CASH PREFERRED -</p>
      </div>

      {/* Menu Image */}
      <div className="relative w-full max-w-3xl">
        <Image
          src="https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/16384068_127.png?0.05441615156036783"
          alt="Tiny Trees February Menu"
          width={1000}
          height={1414}
          className="rounded-lg shadow-lg mb-12"
          priority
        />
      </div>
    </div>
  );
}
