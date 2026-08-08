import Link from "next/link";
import { Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2d6a4f] text-white">
                <Crown className="h-6 w-6 font-bold" />
              </div>

              <span className="text-xl font-bold tracking-tight text-gray-900">
                ChessRivo
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600">
              A simple place to play chess, challenge other players, and improve
              your game one move at a time.
            </p>
          </div>

          {/* Play */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Play</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/play"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Play Chess
                </Link>
              </li>

              <li>
                <Link
                  href="/play/quick-match"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Quick Match
                </Link>
              </li>

              <li>
                <Link
                  href="/play/create-room"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Create a Room
                </Link>
              </li>

              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Learn</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/learn"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Chess Basics
                </Link>
              </li>

              <li>
                <Link
                  href="/learn/openings"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Openings
                </Link>
              </li>

              <li>
                <Link
                  href="/learn/tactics"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Tactics
                </Link>
              </li>

              <li>
                <Link
                  href="/learn/puzzles"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Puzzles
                </Link>
              </li>
            </ul>
          </div>

          {/* ChessRivo */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">ChessRivo</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 transition-colors hover:text-[#2d6a4f]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ChessRivo. All rights reserved.</p>

            <p>Built for chess players.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
