"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accessCode === process.env.NEXT_PUBLIC_HOUSTON_PASSWORD || accessCode === process.env.NEXT_PUBLIC_HOUSTON_PASSWORD_2 || accessCode === process.env.NEXT_PUBLIC_HOUSTON_PASSWORD_3) {
      // Redirect to holiday menu QR code
      window.location.href = "https://qrco.de/tinytreesdailymenu";
    } else if (accessCode === process.env.NEXT_PUBLIC_AUSTIN_PASSWORD) {
      // Set cookie for Austin access
      document.cookie = `auth_token=austin_authorized; path=/; max-age=18000; secure; samesite=strict`;
      router.push("/austin");
    } else {
      setError("Invalid Password");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 animate-fade-in">
      <div className="w-[300px] text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image 
              src="/new_TT_logo.png" 
              width={130} 
              height={130} 
              alt="Welcome Logo"
              className="animate-fade-in transition-transform duration-300 hover:scale-105 pl-4" 
            />
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-white whitespace-nowrap">
            Welcome to Tiny Trees!
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label 
              htmlFor="accessCode" 
              className="text-white text-base block text-left"
            >
              Password:
            </Label>
            <div className="relative">
              <Input
                id="accessCode"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="text-center text-lg transition-all focus:ring-2 focus:ring-[#007a58] px-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <p className="text-sm text-red-500 text-center animate-shake">{error}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-[#007a58] transition-colors text-md text-white"
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
}
