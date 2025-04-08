"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import React, { SVGProps } from 'react';

export function BxBxlGoogle({ 
  width = 24, 
  height = 24, 
  className = "", 
  ...props 
}: SVGProps<SVGSVGElement> & { 
  width?: number, 
  height?: number 
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      className={`inline-block mt-[0.17rem] ${className}`}
      {...props}
    >
      <path 
        d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28a5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934a8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934c0-.528-.081-1.097-.202-1.625z" 
        fill="currentColor"
      ></path>
    </svg>
  )
}

export default function GoogleSignin() {
  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleSignIn} className="cursor-pointer flex items-center justify-center gap-[2px]" variant={'ghost'}>
        <Mail className="mr-2"/>
        Sign in with Google
      </Button>
    </div>
  );
}