import "./globals.css";
import "@/styles/main.scss";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
	description: "Nền tảng thương mại điện tử cho nông dân và các chợ",
	title: "E-Commerce",
};

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const theme = cookieStore.get("theme")?.value;
	const isDark = theme === "dark";

	return (
		<html
			className={cn("font-sans", inter.variable, isDark && "dark")}
			lang="en"
		>
			<body>{children}</body>
		</html>
	);
}
