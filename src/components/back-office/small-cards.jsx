import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

import SmallCard from "@/components/back-office/small-card";

const orderStats = [
	{
		icon: ShoppingCart,
		iconBg: "bg-emerald-500",
		number: 1200,
		title: "Tổng đơn hàng",
	},
	{
		icon: Loader2,
		iconBg: "bg-amber-500",
		number: 210,
		title: "Đơn chờ xử lý",
	},
	{
		icon: RefreshCcw,
		iconBg: "bg-sky-500",
		number: 340,
		title: "Đơn đang xử lý",
	},
	{
		icon: CheckCheck,
		iconBg: "bg-purple-500",
		number: 650,
		title: "Đơn đã giao",
	},
];

export default function SmallCards() {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			{orderStats.map((stat) => (
				<SmallCard key={stat.title} {...stat} />
			))}
		</div>
	);
}
