import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";

const mockBanners = [
	{
		createdAt: "12/08/2025",
		id: "1",
		link: "/dashboard/categories/rau-cu-huu-co",
		title: "Khuyến mãi rau hữu cơ",
	},
	{
		createdAt: "10/08/2025",
		id: "2",
		link: "/dashboard/products/1",
		title: "Trái cây nhập khẩu",
	},
];

export default function BannersPage() {
	return (
		<div>
			<PageHeader
				heading="Banner cửa hàng"
				href="/dashboard/banners/new"
				linkTitle="Thêm banner"
			/>

			<div className="mt-4 overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-slate-200 border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
							<th className="px-4 py-3 font-medium">STT</th>
							<th className="px-4 py-3 font-medium">Tiêu đề</th>
							<th className="px-4 py-3 font-medium">Link</th>
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{mockBanners.map((banner, i) => (
							<tr
								className="border-slate-100 border-b last:border-0 dark:border-slate-700/50"
								key={banner.id}
							>
								<td className="px-4 py-3 text-slate-900 dark:text-slate-100">
									{i + 1}
								</td>
								<td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
									{banner.title}
								</td>
								<td className="max-w-[200px] truncate px-4 py-3 text-slate-500 dark:text-slate-400">
									{banner.link}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{banner.createdAt}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<Link
											className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-700"
											href={`/dashboard/banners/update/${banner.id}`}
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
