import { Trash2 } from "lucide-react";
import PageHeader from "@/components/back-office/page-header";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getCoupons() {
	try {
		const res = await fetch(`${BASE_URL}/api/coupons`, { cache: "no-store" });
		if (!res.ok) return [];
		const json = await res.json();
		return json.data || [];
	} catch {
		return [];
	}
}

export default async function CouponsPage() {
	const coupons = await getCoupons();

	return (
		<div>
			<PageHeader
				heading="Mã giảm giá"
				href="/dashboard/coupons/new"
				linkTitle="Thêm mã giảm giá"
			/>

			<div className="mt-4 overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-slate-200 border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
							<th className="px-4 py-3 font-medium">STT</th>
							<th className="px-4 py-3 font-medium">Tiêu đề</th>
							<th className="px-4 py-3 font-medium">Mã</th>
							<th className="px-4 py-3 font-medium">Hết hạn</th>
							<th className="px-4 py-3 font-medium">Trạng thái</th>
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{coupons.map((coupon, i) => (
							<tr
								className="border-slate-100 border-b last:border-0 dark:border-slate-700/50"
								key={coupon.id}
							>
								<td className="px-4 py-3 text-slate-900 dark:text-slate-100">
									{i + 1}
								</td>
								<td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
									{coupon.title}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{coupon.couponCode}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{new Date(coupon.expiryDate).toLocaleDateString("vi-VN")}
								</td>
								<td className="px-4 py-3">
									<span
										className={`rounded-full px-2 py-0.5 font-medium text-xs ${
											coupon.isActive
												? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
												: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
										}`}
									>
										{coupon.isActive ? "Hoạt động" : "Bản nháp"}
									</span>
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{new Date(coupon.createdAt).toLocaleDateString("vi-VN")}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<button
											className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/20"
											type="button"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
						{coupons.length === 0 && (
							<tr>
								<td
									className="px-4 py-10 text-center text-slate-500 dark:text-slate-400"
									colSpan={7}
								>
									Chưa có mã giảm giá nào.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
