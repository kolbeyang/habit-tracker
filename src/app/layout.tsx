import ScreenContainer from "@/components/ui/ScreenContainer";
import ReduxProvider from "@/store/Provider";
import { cn } from "@/utils/classNameMerge";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "300", "400", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time difference visualizer",
  description: "Visualize time differences between any timezones",
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
        </head>
        <body className={cn(workSans.variable, "antialiased")}>
          <ScreenContainer className="bg-base text-text flex flex-col items-center justify-between p-[2px] overflow-y-auto scrollbar-hide">
            {children}
          </ScreenContainer>
        </body>
      </html>
    </ReduxProvider>
  );
}
