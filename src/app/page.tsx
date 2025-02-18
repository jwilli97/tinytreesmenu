"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Passcode() {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordLogin = () => {
        if (password === process.env.NEXT_PUBLIC_ACCESS_PASSWORD) {
            window.location.href = 'https://qrco.de/holidaymenu';
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div className="min-h-screen bg-[#57c18e] flex items-center justify-center p-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-8">
                    <Image src="/new_TT_logo.png" width={115} height={115} alt="Welcome Logo" />
                </div>
                <div className="flex flex-col items-start w-full max-w-[288px]">
                    <Label htmlFor="password" className="text-white font-semibold text-md">Password</Label>
                    <div className="relative w-full">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="max-w-[288px]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <Button 
                        size="lg" 
                        className="bg-[#007a58] hover:bg-[#007a58]/75 w-72 h-11 mt-4" 
                        onClick={handlePasswordLogin}
                    >
                        Enter
                    </Button>
                </div>
            </div>
        </div>
    );
}
