import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getFarmers() {
	try {
		const res = await fetch(`${BASE_URL}/api/farmers`, { cache: "no-store" });
		if (!res.ok) return [];
		const json = await res.json();
		return json.data || [];
	} catch {
		return [];
	}
}

export default async function FarmersPage() {
	const farmers = await getFarmers();

	return (
		<div>
			<PageHeader
				heading="Nông dân"
				href="/dashboard/farmers/new"
				linkTitle="Thêm nông dân"
			/>

			<div className="mt-4 overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-slate-200 border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
							<th className="px-4 py-3 font-medium">STT</th>
							<th className="px-4 py-3 font-medium">Tên</th>
							<th className="px-4 py-3 font-medium">Mã</th>
							<th className="px-4 py-3 font-medium">Số điện thoại</th>
							<th className="px-4 py-3 font-medium">Email</th>
							<th className="px-4 py-3 font-medium">Trạng thái</th>
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{farmers.map((farmer, i) => (
							<tr
								className="border-slate-100 border-b last:border-0 dark:border-slate-700/50"
								key={farmer.id}
							>
								<td className="px-4 py-3 text-slate-900 dark:text-slate-100">
									{i + 1}
								</td>
								<td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
									{farmer.name}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{farmer.code}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{farmer.phone}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{farmer.email}
								</td>
								<td className="px-4 py-3">
									<span
										className={`rounded-full px-2 py-0.5 font-medium text-xs ${
											farmer.isActive
												? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
												: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
										}`}
									>
										{farmer.isActive ? "Đang hoạt động" : "Chờ xác minh"}
									</span>
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{new Date(farmer.createdAt).toLocaleDateString("vi-VN")}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<Link
											className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-700"
											href={`/dashboard/farmers/update/${farmer.id}`}
										>
											<Pencil size={16} />
										</Link>
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
						{farmers.length === 0 && (
							<tr>
								<td
									className="px-4 py-10 text-center text-slate-500 dark:text-slate-400"
									colSpan={8}
								>
									Chưa có nông dân nào.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
