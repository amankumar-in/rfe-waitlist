import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Rewards For Education | Your Global Future Starts Here",
    template: "%s | Rewards For Education",
  },
  description: "Get the tools and support you need to secure your seat at international universities. From AI tutoring and finance planning to visa documentation assistance.",
  keywords: ["education", "study abroad", "scholarships", "university", "AI tutoring", "student finance", "visa assistance", "international education"],
  authors: [{ name: "Rewards For Education" }],
  creator: "Rewards For Education",
  icons: {
    icon: "/assets/images/global.png",
    shortcut: "/assets/images/global.png",
    apple: "/assets/images/global.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rewardsforeducation.com", // Assuming this is the domain or placeholder
    title: "Rewards For Education | 3 Guaranteed Offers",
    description: "Secure your future with AI tutoring, finance planning, and visa documentation assistance. Join the waitlist for 100% free access.",
    siteName: "Rewards For Education",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rewards For Education - Global Learning Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewards For Education | Your Global Future Starts Here",
    description: "Get 3 Guaranteed Offers. Tools and support for your international education journey.",
    images: ["/assets/images/og-image.jpg"],
    creator: "@rewardsforedu", // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, outfit.variable, "antialiased bg-background text-slate-600")}>
        {children}
      </body>
    </html>
  );
}
