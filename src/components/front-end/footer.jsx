import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-slate-200 border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div className="max-w-sm">
						<h3 className="font-bold text-lg text-slate-900 tracking-tight dark:text-slate-50">
							<span className="text-lime-600 dark:text-lime-400">E-</span>
							Commerce
						</h3>
						<p className="mt-2 text-slate-600 text-sm dark:text-slate-400">
							Nền tảng thương mại điện tử kết nối nông dân, chợ và khách hàng.
						</p>
					</div>
					<nav className="flex flex-col gap-2">
						<h4 className="font-semibold text-slate-900 text-sm dark:text-slate-100">
							Tài khoản
						</h4>
						<Link
							className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
							href="/login"
						>
							Đăng nhập
						</Link>
						<Link
							className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
							href="/register"
						>
							Đăng ký
						</Link>
						<Link
							className="text-slate-600 text-sm hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
							href="/register-farmer"
						>
							Đăng ký nông dân
						</Link>
					</nav>
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
