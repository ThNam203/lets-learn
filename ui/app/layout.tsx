import ConfettiProvider from "@/lib/react-confetti/confetti-provider";
import ToastProvider from "@/lib/react-toastify/toast-provider";
import { cn } from "@/lib/utils";
import "dotenv/config";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import ReduxProvider from "../redux/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Let's Learn",
  description: "Powered by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <ConfettiProvider />
        <body className={cn("default-scrollbar", nunito.className)}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
