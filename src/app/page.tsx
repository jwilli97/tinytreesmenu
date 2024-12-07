'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Intercom from '@intercom/messenger-js-sdk';

export default function Home() {
  // const [menuUrl, setMenuUrl] = useState<string>('');

  async function fetchData() {
    try {

        // Fetch menu URL
        // const menuResponse = await fetch('/api/getMenu');
        // if (!menuResponse.ok) {
        //     throw new Error(`HTTP error! status: ${menuResponse.status}`);
        // }
        // const menuData: { url: string } = await menuResponse.json();
        // setMenuUrl(menuData.url);

        Intercom({
          app_id: 'cdcmnvsm',
        });

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center px-4 py-6 relative">
      <div className="mt-12">
        <p className="text-center">
          [Open MON - SAT: 12pm - 7pm] <br />
          Delivery between 7-11pm <br />
          *6:55pm cutoff for same-day delivery* <br />
          $75 order minimum <br />
          CASH ONLY
        </p>
      </div>
      <div className="mt-6 mb-6">
        <Button>Order Here</Button>
      </div>
      <div className="mt-3 mb-36 w-full">
        <div style={{ position: 'relative', width: '100%', height: '300px', paddingTop: '66.67%' }}>
          <Image
            src="https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/50370932_1.png?0.7927771912096631"
            alt="Current Menu"
            fill
            priority
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}