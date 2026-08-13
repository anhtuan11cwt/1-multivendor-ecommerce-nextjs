import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
	description: "Được tạo bởi create next app",
	title: "Tạo ứng dụng Next.js",
};

export default function RootLayout({ children }) {
	return (
		<html className={cn("font-sans", inter.variable)} lang="vi">
			<body>{children}</body>
		</html>
	);
}
