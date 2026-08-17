import { DollarSign, HelpCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

const helpLinks = [
	{
		description: "Hướng dẫn khách hàng",
		href: "/help",
		icon: HelpCircle,
		title: "Trung tâm trợ giúp",
	},
	{
		description: "Hoàn tiền nhanh chóng",
		href: "/returns",
		icon: RefreshCw,
		title: "Đổi trả dễ dàng",
	},
	{
		description: "Đăng ký người bán",
		href: "/register-farmer",
		icon: DollarSign,
		title: "Bán hàng trên E-Commerce",
	},
];

export default function UtilitySidebar() {
	return (
		<aside className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-md dark:border-gray-600 dark:bg-slate-800">
			<div className="divide-y divide-slate-200 dark:divide-slate-700">
				{helpLinks.map(({ description, href, icon: Icon, title }) => (
					<Link
						className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
						href={href}
						key={href}
					>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800 dark:bg-lime-500/20 dark:text-lime-400">
							<Icon className="size-5" />
						</div>
						<div className="min-w-0">
							<p className="truncate font-medium text-slate-900 text-sm dark:text-slate-100">
								{title}
							</p>
							<p className="text-[11px] text-slate-400 uppercase tracking-wide dark:text-slate-500">
								{description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</aside>
	);
}
