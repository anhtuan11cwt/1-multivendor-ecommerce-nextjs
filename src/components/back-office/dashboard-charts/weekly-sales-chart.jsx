"use client";

import { faker } from "@faker-js/faker";
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { ShoppingBag, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import { cn } from "@/lib/utils";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Title,
	Tooltip,
	Legend,
);

const months = [
	"Tháng 1",
	"Tháng 2",
	"Tháng 3",
	"Tháng 4",
	"Tháng 5",
	"Tháng 6",
	"Tháng 7",
];

function generateSeries(min, max, fallback) {
	try {
		return months.map(() => faker.number.int({ max, min }));
	} catch {
		return fallback;
	}
}

const salesData = generateSeries(
	2_000_000,
	10_000_000,
	[4200000, 6800000, 5100000, 7900000, 8600000, 6200000, 9400000],
);
const ordersData = generateSeries(
	500,
	2000,
	[850, 1120, 940, 1360, 1290, 1530, 1780],
);

const tickColor = "rgb(148, 163, 184)";
const gridColor = "rgba(148, 163, 184, 0.15)";

const tabs = [
	{ icon: TrendingUp, title: "Doanh thu", type: "sales" },
	{ icon: ShoppingBag, title: "Đơn hàng", type: "orders" },
];

const options = {
	maintainAspectRatio: false,
	plugins: {
		legend: {
			labels: { color: tickColor },
		},
	},
	responsive: true,
	scales: {
		x: {
			grid: { color: gridColor },
			ticks: { color: tickColor },
		},
		y: {
			grid: { color: gridColor },
			ticks: { color: tickColor },
		},
	},
};

export default function WeeklySalesChart() {
	const [chartToDisplay, setChartToDisplay] = useState("sales");

	const datasets = {
		orders: {
			backgroundColor: "rgba(59, 130, 246, 0.2)",
			borderColor: "rgba(59, 130, 246, 1)",
			data: ordersData,
			fill: true,
			label: "Đơn hàng",
			tension: 0.3,
		},
		sales: {
			backgroundColor: "rgba(249, 115, 22, 0.2)",
			borderColor: "rgba(249, 115, 22, 1)",
			data: salesData,
			fill: true,
			label: "Doanh thu (₫)",
			tension: 0.3,
		},
	};

	const chartData = {
		datasets: [datasets[chartToDisplay]],
		labels: months,
	};

	return (
		<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
			<div className="mb-6 flex items-center justify-between gap-4">
				<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
					Doanh thu &amp; đơn hàng theo tuần
				</h3>
				<div className="flex rounded-md bg-slate-100 p-1 dark:bg-slate-700">
					{tabs.map((tab) => (
						<button
							className={cn(
								"inline-flex items-center gap-1.5 rounded px-3 py-1.5 font-medium text-sm transition-colors",
								chartToDisplay === tab.type
									? "bg-slate-800 text-white dark:bg-slate-900"
									: "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
							)}
							key={tab.type}
							onClick={() => setChartToDisplay(tab.type)}
							type="button"
						>
							<tab.icon className="size-4" />
							{tab.title}
						</button>
					))}
				</div>
			</div>
			<div className="h-72">
				<Line data={chartData} options={options} />
			</div>
		</div>
	);
}
