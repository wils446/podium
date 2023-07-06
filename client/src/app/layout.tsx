"use client";

import { Providers } from "@/redux/provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { RequireUser } from "@/components";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>Podium</title>
				<meta name="description" content="Share Your Thoughts Here." />
			</head>
			<body className={inter.className}>
				<Providers>
					<RequireUser>{children}</RequireUser>
				</Providers>
			</body>
		</html>
	);
}
