import Providers from "./Providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Prose",
  description: "A book review website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
