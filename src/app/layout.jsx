import "./globals.css";

export const metadata = {
	description: "Được tạo bởi create next app",
	title: "Tạo ứng dụng Next.js",
};

export default function RootLayout({ children }) {
	return (
		<html lang="vi">
			<body>{children}</body>
		</html>
	);
}
