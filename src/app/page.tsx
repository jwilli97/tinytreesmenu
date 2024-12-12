'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleX, Eye, EyeOff } from "lucide-react";

export default function Login() {

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/getPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/houston');
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('An error occurred');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-[#57c18e]">
      <form onSubmit={handleSubmit}>
        <div className="flex h-screen w-full flex-col items-center justify-center px-4 py-12">
          <div className="mb-10 animate-wiggle">
            <Image src="/tinytreelogo.png" width={100} height={100} alt="Welcome Logo"  />
          </div>
          <div>
            <h1 className="text-white text-4xl mb-8 font-semibold">Welcome to Tiny Trees</h1>
          </div>
          <div className="grid w-2/5 text-black items-center mb-6 relative">
            <Input 
              type={showPassword ? "text" : "password"}
              id="password" 
              placeholder="*******" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (<div className="flex flex-row text-red-500 font-thin text-sm"><CircleX /> {error}</div>)}
          <div>
            <Button className="bg-[#007a58] hover:bg-[#007a58]/75 font-semibold w-60 h-11 mt-6" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Enter'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};