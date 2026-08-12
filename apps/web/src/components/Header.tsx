"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Plus,
  Github,
  Bell,
  Bot,
  DownloadCloud,
  ChevronDown,
  LogOut,
  User,
  BookOpen,
  Settings,
} from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  const user = session?.user as any;
  const isLoggedIn = status === "authenticated" && user;
  const avatarUrl = user?.avatarUrl || user?.image;
  const username = user?.username || user?.name || "user";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setCreateMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-[#161b22] border-b border-[#30363d] px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity"
        >
          <Github className="w-8 h-8 fill-white" />
        </Link>

        {/* Search Bar */}
        <div className="relative w-64 md:w-72 hidden sm:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8b949e]" />
          <input
            type="text"
            placeholder="Type / to search..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-8 py-1.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors"
          />
          <kbd className="absolute right-2 top-2 text-[10px] bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded font-mono border border-[#30363d]">
            /
          </kbd>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-4 text-xs font-semibold text-[#c9d1d9]">
          {isLoggedIn && (
            <>
              <Link href="/" className="hover:text-white transition-colors">
                Pull requests
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Issues
              </Link>
            </>
          )}
          <Link
            href="/ai"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Bot className="w-3.5 h-3.5 text-[#58a6ff]" />
            AI Sandbox
          </Link>
          <Link
            href="/import"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-[#3fb950]" />
            Import
          </Link>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            {/* Notifications */}
            <Link
              href="/"
              className="relative text-[#8b949e] hover:text-white transition-colors p-1"
            >
              <Bell className="w-4 h-4" />
            </Link>

            {/* Create Menu */}
            <div ref={createRef} className="relative">
              <button
                onClick={() => setCreateMenuOpen(!createMenuOpen)}
                className="flex items-center gap-0.5 text-[#c9d1d9] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {createMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 z-50">
                  <Link
                    href="/new"
                    className="block px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors"
                    onClick={() => setCreateMenuOpen(false)}
                  >
                    New repository
                  </Link>
                  <Link
                    href="/import"
                    className="block px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors"
                    onClick={() => setCreateMenuOpen(false)}
                  >
                    Import repository
                  </Link>
                </div>
              )}
            </div>

            {/* User Avatar Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={username}
                    className="w-8 h-8 rounded-full border border-[#30363d]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#30363d] text-white font-bold text-xs flex items-center justify-center border border-[#8b949e]/30">
                    {username.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <ChevronDown className="w-3 h-3 text-[#8b949e]" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-[#30363d]">
                    <p className="text-xs font-bold text-white">{username}</p>
                    <p className="text-[10px] text-[#8b949e]">{user?.email}</p>
                  </div>

                  <Link
                    href={`/${username}`}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-3.5 h-3.5" />
                    Your profile
                  </Link>
                  <Link
                    href={`/${username}?tab=repositories`}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Your repositories
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </Link>

                  <div className="border-t border-[#30363d] mt-1 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="bg-[#21262d] hover:bg-[#30363d] text-white font-semibold text-xs px-3.5 py-1.5 rounded-md border border-[#30363d] flex items-center gap-2 transition-colors shadow-sm"
            >
              Sign in
            </Link>

            <Link
              href="/auth/signin"
              className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-sm"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
