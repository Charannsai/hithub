"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Github, Lock, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <Github className="w-12 h-12 text-white fill-white" />
          <h1 className="text-2xl font-light text-[#f0f6fc]">
            Sign in to Hithub
          </h1>
        </div>

        {/* Sign In Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-5">
          <p className="text-xs text-[#8b949e] text-center">
            Sign in with your GitHub account to access repositories, issues, pull requests, and more.
          </p>

          <button
            onClick={handleGitHubSignIn}
            disabled={loading}
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm py-2.5 px-4 rounded-md transition-all shadow-sm flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="w-5 h-5 fill-white" />
            <span>{loading ? "Redirecting to GitHub..." : "Sign in with GitHub"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#30363d]" />
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider">secure oauth</span>
            <div className="flex-1 h-px bg-[#30363d]" />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8b949e]">
            <Lock className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>Your credentials are handled securely by GitHub. Hithub never sees your password.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-xs text-[#8b949e]">
            New to Hithub?{" "}
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              Create a GitHub account
            </a>
          </p>
          <div className="text-[10px] text-[#8b949e] space-x-3">
            <span>Terms</span>
            <span>·</span>
            <span>Privacy</span>
            <span>·</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
