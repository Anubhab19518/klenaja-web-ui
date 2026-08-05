import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Kleanja — Dirt Ka The End | Premium Cleaning & Hygiene Solutions",
  description:
    "Kleanja offers a comprehensive range of cleaning and hygiene products for homes, offices, hospitals, and industries. Superior quality, trusted performance. Dirt Ka The End.",
  keywords:
    "cleaning products, hygiene solutions, floor cleaner, toilet cleaner, handwash, disinfectant, FMCG, B2B cleaning, India",
  openGraph: {
    title: "Kleanja — Dirt Ka The End",
    description:
      "Premium cleaning & hygiene solutions for every environment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
