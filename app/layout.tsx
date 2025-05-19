import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VeltWrapper } from "@/lib/context/velt-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { SearchCommand } from "@/components/search-command";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion + Velt",
  description: "Comment on Notion Like Docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <VeltWrapper>
            <div className="min-h-screen flex flex-col">
              <div className="flex flex-1">
                <Navigation />
                <main className="flex-1 h-full overflow-y-auto">
                  <SearchCommand />
                  {children}
                </main>
              </div>
            </div>
          </VeltWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
