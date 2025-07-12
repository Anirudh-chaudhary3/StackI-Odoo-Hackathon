"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-gray-700 px-6 py-4 bg-[#101828] text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-white flex items-center">
          <Image src="/images/logo.png" alt="StackIt" width={70} height={70} className="-translate-y-1" />
          StackIt
        </Link>

        {/* Desktop Nav Links + Auth */}
        <div className="hidden md:flex items-center gap-6">
          {/* Nav Items */}
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}

          {/* Auth */}
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <button className="px-4 py-1 border border-gray-600 rounded hover:bg-gray-800 transition">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white"
          aria-label="Toggle Mobile Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-4 px-4">
          {/* Nav Items */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Auth */}
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <button className="w-full text-left px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </header>
  );
}
