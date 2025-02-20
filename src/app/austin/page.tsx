"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";

export default function AustinPage() {
  return (
    <div className="min-h-screen w-full bg-pink-100 relative">
      <div className="absolute top-6 right-6 text-pink-800 z-50 sm:top-8 sm:right-8">
        <LogoutButton />
      </div>
      
      <div className="flex flex-col items-center text-pink-800 pt-20 sm:pt-8 relative p-4 sm:p-8">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm -z-10" />
        
        {/* Header Information */}
        <div className="mb-8 text-center mt-4 sm:mt-0">
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">[Open MON - SAT: 10am - 6pm]</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">Delivery between 6-10pm</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">*6:00pm cutoff for same-day delivery*</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">$50 order minimum</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base">- CASH PREFERRED -</p>
        </div>

        {/* Menu Image */}
        <div className="relative w-full max-w-3xl px-2 sm:px-4">
          <Image
            src="https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/16384068_127.png?0.05441615156036783"
            alt="Tiny Trees February Menu"
            width={1000}
            height={1414}
            className="rounded-lg shadow-lg mb-12 border-4 border-pink-200 shadow-pink-400"
            priority
          />
        </div>
      </div>
    </div>
  );
}
