"use client";

import { Providers } from "@/redux/provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { RequireUser } from "@/components";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Podium",
	description: "Share Your Thougts Here",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<RequireUser>{children}</RequireUser>
				</Providers>
			</body>
		</html>
	);
}
