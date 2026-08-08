"use client";

import Link from "next/link";
import { Crown, Menu, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/isUser", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Check user error:", error);

        setIsLoggedIn(false);
      } finally {
        setCheckingUser(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        setIsLoggedIn(false);
        setMenuOpen(false);

        window.location.href = "/";
      } else {
        console.log("Logout failed:", data.message);
      }
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      {" "}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Crown className="h-6 w-6 font-bold text-[#2d6a4f]" />

          <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            ChessRivo
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#2d6a4f] transition-colors hover:text-[#24553f]"
          >
            Home
          </Link>

          <Link
            href="/play"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2d6a4f]"
          >
            Play
          </Link>

          <Link
            href="/learn"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2d6a4f]"
          >
            Learn
          </Link>

          <Link
            href="/leaderboard"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2d6a4f]"
          >
            Leaderboard
          </Link>
        </div>

        {/* Desktop Actions */}

        <div className="hidden items-center gap-3 md:flex">
          {checkingUser ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
          ) : isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-lg border border-[#2d6a4f] px-4 py-2 text-sm font-semibold text-[#2d6a4f] transition-colors hover:bg-[#2d6a4f] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />

              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#2d6a4f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24553f]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#2d6a4f] hover:bg-gray-50"
              >
                Home
              </Link>

              <Link
                href="/play"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Play
              </Link>

              <Link
                href="/learn"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Learn
              </Link>

              <Link
                href="/leaderboard"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Leaderboard
              </Link>

              {/* Mobile Auth */}

              <div className="mt-3 flex gap-3 border-t border-gray-100 pt-4">
                {checkingUser ? (
                  <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
                ) : isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2d6a4f] px-4 py-2.5 text-sm font-semibold text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />

                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Log in
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-lg bg-[#2d6a4f] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#24553f]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
