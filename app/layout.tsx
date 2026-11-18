import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE } from "@/components/talks-view";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const title = "Talks — Chaowalit Greepoke";
const description = "Talks given by Chaowalit Greepoke (Book) at conferences and meetups.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Chaowalit Greepoke (Book)", url: "https://bookchaowalit.com" }],
  creator: "Chaowalit Greepoke (Book)",
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE, title, description, siteName: "Talks" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
  return <html lang="en" className={geistSans.variable}><body>{children}</body></html>;
}
