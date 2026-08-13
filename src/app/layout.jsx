import "./globals.css";

export const metadata = {
  title: "Tạo ứng dụng Next.js",
  description: "Được tạo bởi create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
