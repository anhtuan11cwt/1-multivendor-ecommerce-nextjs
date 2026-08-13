import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

const stats = [
	{ label: "Tổng đơn hàng", value: "1.200" },
	{ label: "Doanh thu", value: "2,4M ₫" },
	{ label: "Nông dân", value: "340" },
];

const chartBars = [40, 65, 50, 80, 60, 90, 75];

export default function Hero() {
	return (
		<section className="bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-950 text-white">
			<div className="mx-auto max-w-4xl px-4 py-32 text-center">
				<h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
					Nền tảng thương mại điện tử cho nông dân và chợ địa phương
				</h1>
				<p className="mx-auto mt-6 max-w-2xl text-emerald-50/90 text-lg">
					Kết nối nông dân, chợ và khách hàng trên một nền tảng duy nhất. Quản
					lý sản phẩm, đơn hàng và doanh thu một cách dễ dàng.
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
						href="/dashboard"
					>
						<BarChart3 className="size-5" />
						Xem bảng điều khiển
					</Link>
					<Link
						className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
						href="/dashboard/products"
					>
						Khám phá tài khoản demo
						<ArrowRight className="size-5" />
					</Link>
				</div>

				<div className="mx-auto mt-16 max-w-3xl rounded-lg bg-white/10 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur-sm">
					<div className="grid grid-cols-3 gap-3">
						{stats.map((stat) => (
							<div
								className="rounded-md bg-white/10 p-4 text-left"
								key={stat.label}
							>
								<p className="text-emerald-100/80 text-xs">{stat.label}</p>
								<p className="mt-1 font-bold text-xl">{stat.value}</p>
							</div>
						))}
					</div>
					<div className="mt-3 flex h-24 items-end gap-2 rounded-md bg-white/10 p-4">
						{chartBars.map((height) => (
							<div
								className="flex-1 rounded-sm bg-emerald-300/80"
								key={height}
								style={{ height: `${height}%` }}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
