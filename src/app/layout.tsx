import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {AuthProvider} from "@/store/twitch/userContext";
import {ReactNode} from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anagame - Trouve les anagrames en stream!",
  description: "Anagame est un jeu qui se base sur twitch. Le but est de faire participer le tchat pour qu'ils trouvent des anagrames selon les lettres données!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
