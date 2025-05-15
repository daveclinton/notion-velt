import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppProvider } from "@/lib/context/app-context";
import { VeltWrapper } from "@/lib/context/velt-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <VeltWrapper>
            <AppProvider>
              <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                  <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                      {children}
                    </div>
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </AppProvider>
          </VeltWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
