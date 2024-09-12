import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "../Providers"; 
import { AppbarClient } from "../components/AppbarClient";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element{
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="min-w-screen min-h-screen bh-[#ebe6e6]">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
      
    </html>
  );
}
