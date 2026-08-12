"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleGitHubSignIn = async () => {
    setLoading(true);
    try {
      // Create session for octocat user in local SQLite database
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "octocat" }),
      });

      if (res.ok) {
        setAuthenticated(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-lg p-8 space-y-6 text-center shadow-2xl">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center">
            <Github className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Sign in to Hithub</h1>
          <p className="text-xs text-[#8b949e]">
            Use your GitHub account to authenticate across Hithub repositories, issues, and AI agents.
          </p>
        </div>

        {authenticated ? (
          <div className="p-4 bg-[#0d1117] border border-[#238636] rounded-md text-[#3fb950] text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Authenticated as octocat! Redirecting...
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleGitHubSignIn}
              disabled={loading}
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-sm py-3 px-4 rounded-md transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Github className="w-5 h-5 fill-white" />
              <span>{loading ? "Authenticating..." : "Sign in with GitHub"}</span>
            </button>

            <div className="pt-4 border-t border-[#30363d] text-[11px] text-[#8b949e]">
              By signing in, you agree to Hithub Terms of Service and Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
