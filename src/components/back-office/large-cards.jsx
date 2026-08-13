import {
	Banknote,
	CalendarClock,
	CalendarDays,
	TrendingUp,
} from "lucide-react";

import LargeCard from "@/components/back-office/large-card";

const stats = [
	{
		color: "bg-emerald-500",
		icon: TrendingUp,
		number: 2350000,
		title: "Doanh số hôm nay",
	},
	{
		color: "bg-sky-500",
		icon: Banknote,
		number: 1500000,
		title: "Doanh số hôm qua",
	},
	{
		color: "bg-orange-500",
		icon: CalendarDays,
		number: 8500000,
		title: "Tháng này",
	},
	{
		color: "bg-purple-500",
		icon: CalendarClock,
		number: 95000000,
		title: "Tổng cộng",
	},
];

export default function LargeCards() {
	return (
		<div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<LargeCard key={stat.title} {...stat} />
			))}
		</div>
	);
}
