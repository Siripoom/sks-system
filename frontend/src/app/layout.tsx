import type { Metadata } from "next";
import ThemeProvider from "@/components/common/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKS Transportation System",
  description: "School Bus Transportation Management System",
  manifest: "/manifest.json",
  themeColor: "#1890ff",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SKS Transport",
  },
  openGraph: {
    title: "SKS Transportation System",
    description: "School Bus Transportation Management System",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
