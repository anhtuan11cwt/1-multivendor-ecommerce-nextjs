import Image from "next/image";
import Link from "next/link";

const footerColumns = [
	{
		links: [
			{ href: "/categories/vegetables", title: "Rau hữu cơ" },
			{ href: "/categories/fruits", title: "Trái cây tươi" },
			{ href: "/categories/dairy", title: "Sản phẩm sữa" },
			{ href: "/categories/grains", title: "Ngũ cốc" },
		],
		title: "Danh mục",
	},
	{
		links: [
			{ href: "/login", title: "Đăng nhập" },
			{ href: "/register", title: "Đăng ký" },
			{ href: "/register-farmer", title: "Đăng ký nông dân" },
		],
		title: "Tài khoản",
	},
	{
		links: [
			{ href: "/help", title: "Trung tâm trợ giúp" },
			{ href: "/track", title: "Theo dõi đơn hàng" },
			{ href: "/returns", title: "Trả hàng & hoàn tiền" },
			{ href: "/chat", title: "Chat trực tuyến" },
		],
		title: "Trợ giúp",
	},
];

export default function Footer() {
	return (
		<footer className="border-slate-200 border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div className="max-w-xs">
						<Link aria-label="Trang chủ" href="/">
							<Image
								alt="E-Commerce"
								className="h-auto dark:invert"
								height={30}
								src="/logo.svg"
								unoptimized
								width={132}
							/>
						</Link>
						<p className="mt-4 text-slate-600 text-sm dark:text-slate-400">
							Nền tảng thương mại điện tử kết nối nông dân, chợ và khách hàng.
							Đặt mua nông sản tươi sạch mỗi ngày.
						</p>
					</div>
					{footerColumns.map((column) => (
						<nav key={column.title}>
							<h4 className="font-semibold text-slate-900 text-sm dark:text-slate-100">
								{column.title}
							</h4>
							<ul className="mt-4 space-y-2">
								{column.links.map((link) => (
									<li key={link.title}>
										<Link
											className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
											href={link.href}
										>
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>
				<div className="mt-10 border-slate-200 border-t pt-6 dark:border-slate-800">
					<p className="text-center text-slate-500 text-sm dark:text-slate-400">
						© {new Date().getFullYear()} E-Commerce. Dự án được xây dựng cho mục
						đích học tập và sử dụng cá nhân. Mọi hành vi sử dụng thương mại cần
						sự cho phép của tác giả.
					</p>
				</div>
			</div>
		</footer>
	);
}
