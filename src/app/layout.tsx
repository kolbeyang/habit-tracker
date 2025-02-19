import ScreenContainer from "@/components/ui/ScreenContainer";
import ReduxProvider from "@/store/Provider";
import { cn } from "@/utils/classNameMerge";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habit Square",
  description: "Simple habit tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <head>
          <meta
            name="google-adsense-account"
            content="ca-pub-1198833545019540"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body className={cn(workSans.variable, "font-workSans antialiased")}>
          <ScreenContainer className="bg-base text-text flex flex-col items-center justify-between p-[2px] overflow-y-auto scrollbar-hide">
            {children}
          </ScreenContainer>
        </body>
      </html>
    </ReduxProvider>
  );
}
