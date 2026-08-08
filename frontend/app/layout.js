import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata = {
  title: "ChessRivo",
  description: "Play chess online with ChessRivo.",
  icons: {
    icon: "/media/images/chess_logo_image-modified.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <link
          rel="icon"
          type="image/png"
          href="chess_logo_image-modified.png"
        ></link> */}

        <title>ChessRivo</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css"
          integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
      </head>
      <body>
        {children}

        <Toaster position="bottom-right" richColors closeButton />

        {/* Socket.io cdn */}
        <Script src="https://cdn.socket.io/4.8.3/socket.io.min.js"></Script>

        {/* Chessjs cdn */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"
          integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></Script>

        {/* Tailwind CSS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1"
          type="module"
        ></Script>
      </body>
    </html>
  );
}
