"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
	datasets: [
		{
			backgroundColor: [
				"rgba(16, 185, 129, 0.85)",
				"rgba(59, 130, 246, 0.85)",
				"rgba(249, 115, 22, 0.85)",
				"rgba(168, 85, 247, 0.85)",
			],
			borderColor: [
				"rgba(16, 185, 129, 1)",
				"rgba(59, 130, 246, 1)",
				"rgba(249, 115, 22, 1)",
				"rgba(168, 85, 247, 1)",
			],
			borderWidth: 2,
			data: [50, 10, 20, 20],
			label: "Tỷ lệ (%)",
		},
	],
	labels: ["Bắp cải", "Dưa hấu", "Bông cải xanh", "Ngô"],
};

const options = {
	maintainAspectRatio: false,
	plugins: {
		legend: {
			labels: {
				color: "rgb(148, 163, 184)",
			},
		},
		tooltip: {
			callbacks: {
				label: (context) => ` ${context.label}: ${context.raw}%`,
			},
		},
	},
	responsive: true,
};

export default function BestSellingProductsChart() {
	return (
		<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
			<h3 className="mb-6 font-bold text-lg text-slate-900 dark:text-slate-100">
				Sản phẩm bán chạy
			</h3>
			<div className="h-72">
				<Pie data={data} options={options} />
			</div>
		</div>
	);
}
