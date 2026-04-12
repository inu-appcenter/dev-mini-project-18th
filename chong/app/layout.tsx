import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const SuitFont = localFont({
    src: [
        {
            path: "../src/assets/fonts/SUITE-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../src/assets/fonts/SUITE-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../src/assets/fonts/SUITE-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../src/assets/fonts/SUITE-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    title: "Todo List",
    description: "인천대 앱센터 미니프로젝트에서 진행하는 Todo List",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={SuitFont.className}>
            <body>{children}</body>
        </html>
    );
}
