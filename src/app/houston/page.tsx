"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { useEffect, useState } from "react";

export default function HoustonPage() {
  const [menuImageUrl, setMenuImageUrl] = useState("https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/21238494_127.png?0.5818893891642476"); // Default fallback image

  useEffect(() => {
    async function fetchMenuImage() {
      try {
        const response = await fetch('/api/getMenu');
        const data = await response.json();
        if (data.imageUrl) {
          setMenuImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch menu image:', error);
        // Keep using the fallback image if fetch fails
      }
    }

    fetchMenuImage();
  }, []);

  return (
    <div className="min-h-screen w-full bg-pink-100 relative">
      <div className="absolute top-6 right-6 text-pink-800 z-50 sm:top-8 sm:right-8">
        <LogoutButton />
      </div>
      
      <div className="flex flex-col items-center text-pink-800 pt-20 sm:pt-8 relative p-4 sm:p-8">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm -z-10" />
        
        {/* Header Information */}
        <div className="mb-8 text-center mt-4 sm:mt-0">
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">[Open MON - SAT: 12pm - 7pm]</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">Delivery between 7-11pm</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">*6:55pm cutoff for same-day delivery*</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base mb-2">$75 order minimum</p>
          <p className="font-medium text-pink-800 text-sm sm:text-base">- CASH ONLY -</p>
        </div>

        <div>
          <Button 
            className="bg-pink-400 mb-8 text-white hover:bg-pink-500 transition-colors px-8 py-2 text-base sm:text-lg"
            onClick={() => window.open('https://tinytrees.typeform.com/orderform', '_blank')}
          >
            ORDER HERE
          </Button>
        </div>

        {/* Menu Image */}
        <div className="relative w-full max-w-3xl px-2 sm:px-4">
          <Image
            src={menuImageUrl}
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
