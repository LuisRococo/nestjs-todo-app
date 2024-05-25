import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContext } from "@/context/authContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My TODO App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <AuthContext>
            <Navbar />
            <div className="tw-min-h-screen">{children}</div>
            <Footer />
          </AuthContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
