import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getCategories() {
	try {
		const res = await fetch(`${BASE_URL}/api/categories`, {
			cache: "no-store",
		});
		if (!res.ok) return [];
		const json = await res.json();
		return json.data || [];
	} catch {
		return [];
	}
}

export default async function CategoriesPage() {
	const categories = await getCategories();

	return (
		<div>
			<PageHeader
				heading="Danh mục"
				href="/dashboard/categories/new"
				linkTitle="Thêm danh mục"
			/>

			<div className="mt-4 overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-slate-200 border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
							<th className="px-4 py-3 font-medium">STT</th>
							<th className="px-4 py-3 font-medium">Tên danh mục</th>
							<th className="px-4 py-3 font-medium">Slug</th>
							<th className="px-4 py-3 font-medium">Mô tả</th>
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((cat, i) => (
							<tr
								className="border-slate-100 border-b last:border-0 dark:border-slate-700/50"
								key={cat.id}
							>
								<td className="px-4 py-3 text-slate-900 dark:text-slate-100">
									{i + 1}
								</td>
								<td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
									{cat.title}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{cat.slug}
								</td>
								<td className="max-w-[200px] truncate px-4 py-3 text-slate-500 dark:text-slate-400">
									{cat.description}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{new Date(cat.createdAt).toLocaleDateString("vi-VN")}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<Link
											className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-700"
											href={`/dashboard/categories/update/${cat.id}`}
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
						{categories.length === 0 && (
							<tr>
								<td
									className="px-4 py-10 text-center text-slate-500 dark:text-slate-400"
									colSpan={6}
								>
									Chưa có danh mục nào.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
