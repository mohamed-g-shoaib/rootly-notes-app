import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { EditingProvider } from "@/components/editing-context";
import { StorageModeProvider } from "@/components/storage-mode-provider";
import { LocalStorageWarning } from "@/components/local-storage-warning";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RootlyLogo } from "@/components/rootly-logo";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rootly-notes-app.vercel.app";
  const title = "Rootly Notes";
  const description = "Your learning journey tracker";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s · Rootly Notes",
    },
    description,
    generator: "v0.app",
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Rootly Notes",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: "/",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Rootly Notes",
              description:
                "Your learning journey tracker - A modern web application for tracking courses, notes, and daily study progress.",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ??
                "https://rootly-notes-app.vercel.app",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Course Management",
                "Smart Notes with Q&A Format",
                "Daily Study Tracking",
                "Mood Logging",
                "Visual Analytics",
                "Spaced Repetition Review",
                "Offline-First Storage",
                "Optional Cloud Sync",
              ],
              author: {
                "@type": "Organization",
                name: "Rootly Notes",
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StorageModeProvider>
            <EditingProvider>
              <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2 shrink-0">
                    <RootlyLogo size={32} className="text-foreground" />
                    <span className="font-semibold tracking-tight text-lg md:text-xl hidden sm:inline">
                      Rootly
                    </span>
                  </Link>
                  <Navigation />
                </div>
              </header>
              {children}
              <Footer />
              <Toaster richColors closeButton dir="ltr" />
              <LocalStorageWarning />
            </EditingProvider>
          </StorageModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
