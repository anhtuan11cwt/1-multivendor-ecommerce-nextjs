import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({ items }) {
	return (
		<nav
			aria-label="Breadcrumb"
			className="mb-8 flex items-center gap-2 text-slate-500 text-sm dark:text-slate-400"
		>
			<Link
				className="inline-flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white"
				href="/"
			>
				<Home className="size-4" />
				Trang chủ
			</Link>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;
				return (
					<span className="flex items-center gap-2" key={item.label}>
						<ChevronRight className="size-4" />
						{isLast || !item.href ? (
							<span className="truncate font-medium text-slate-900 dark:text-slate-100">
								{item.label}
							</span>
						) : (
							<Link
								className="transition-colors hover:text-slate-900 dark:hover:text-white"
								href={item.href}
							>
								{item.label}
							</Link>
						)}
					</span>
				);
			})}
		</nav>
	);
}
