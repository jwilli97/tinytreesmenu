"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";

export default function HoustonPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center text-white mt-8">
      <LogoutButton />
      {/* Header Information */}
      <div className="mb-6 text-center">
        <p>[Open MON - SAT: 12pm - 7pm]</p>
        <p>Delivery between 7-11pm</p>
        <p>*6:55pm cutoff for same-day delivery*</p>
        <p>$75 order minimum</p>
        <p>- CASH ONLY -</p>
      </div>

      <div>
      <Button 
          className="bg-white mb-8 text-[#57c18e] hover:bg-white/90"
          onClick={() => window.open('https://tinytrees.typeform.com/orderform', '_blank')}
        >
          ORDER HERE
        </Button>
      </div>

      {/* Menu Image */}
      <div className="relative w-full max-w-3xl">
        <Image
          src="https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/51554728_1.png?0.5599618812725238"
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
