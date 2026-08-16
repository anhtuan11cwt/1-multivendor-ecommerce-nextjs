import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";
import TableActions from "@/components/back-office/table-actions";

const mockCategories = [
	{
		createdAt: "12/08/2025",
		description: "Các loại rau củ được trồng theo phương pháp hữu cơ",
		id: "1",
		slug: "rau-cu-huu-co",
		title: "Rau củ hữu cơ",
	},
	{
		createdAt: "10/08/2025",
		description: "Trái cây tươi từ các vùng miền nhiệt đới",
		id: "2",
		slug: "trai-cay-nhiet-doi",
		title: "Trái cây nhiệt đới",
	},
	{
		createdAt: "08/08/2025",
		description: "Sản phẩm thực phẩm đã qua chế biến sẵn",
		id: "3",
		slug: "thuc-pham-che-bien",
		title: "Thực phẩm chế biến",
	},
	{
		createdAt: "05/08/2025",
		description: "Các loại ngũ cốc và đậu hạt dinh dưỡng",
		id: "4",
		slug: "ngu-coc-beans",
		title: "Ngũ cốc & Beans",
	},
];

export default function CategoriesPage() {
	return (
		<div>
			<PageHeader
				heading="Danh mục"
				href="/dashboard/categories/new"
				linkTitle="Thêm danh mục"
			/>
			<TableActions />

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
						{mockCategories.map((cat, i) => (
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
									{cat.createdAt}
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
					</tbody>
				</table>
			</div>
		</div>
	);
}
