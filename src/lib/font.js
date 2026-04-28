import localFont from "next/font/local";
import { Quicksand, Cormorant_Garamond } from "next/font/google";

// Avenir (local)
export const avenir = localFont({
  src: [
    { path: "../fonts/Avenir-Light.woff2", weight: "300" },
    { path: "../fonts/Avenir-Regular.woff2", weight: "400" },
    { path: "../fonts/Avenir-Book.woff2", weight: "500" },
    { path: "../fonts/Avenir-Black.woff2", weight: "900" },
  ],
  variable: "--font-avenir",
  display: "swap",
});

// Google fonts
export const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});
