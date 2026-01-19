import type { Metadata } from "next";
import { Bebas_Neue, Newsreader } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adjust Kore Nen",
  description:
    "একটা স্যাটায়ার গেম, যেখানে সব সমস্যার সমাধান—অ্যাডজাস্ট করে নেন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
