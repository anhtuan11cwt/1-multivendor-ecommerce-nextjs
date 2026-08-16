import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";

const mockProducts = [
	{
		category: "Rau củ hữu cơ",
		createdAt: "16/08/2025",
		id: "1",
		price: 45000,
		sku: "SKU-001",
		tags: ["Rau sạch", "Hữu cơ"],
		title: "Bó rau muống hữu cơ",
	},
];

function formatPrice(value) {
	return new Intl.NumberFormat("vi-VN", {
		currency: "VND",
		style: "currency",
	}).format(value);
}

export default function ProductsPage() {
	return (
		<div>
			<PageHeader
				heading="Sản phẩm"
				href="/dashboard/products/new"
				linkTitle="Thêm sản phẩm"
			/>

			<div className="mt-4 overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-slate-200 border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
							<th className="px-4 py-3 font-medium">STT</th>
							<th className="px-4 py-3 font-medium">Tên sản phẩm</th>
							<th className="px-4 py-3 font-medium">SKU</th>
							<th className="px-4 py-3 font-medium">Danh mục</th>
							<th className="px-4 py-3 font-medium">Giá</th>
							<th className="px-4 py-3 font-medium">Tags</th>
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{mockProducts.map((product, i) => (
							<tr
								className="border-slate-100 border-b last:border-0 dark:border-slate-700/50"
								key={product.id}
							>
								<td className="px-4 py-3 text-slate-900 dark:text-slate-100">
									{i + 1}
								</td>
								<td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
									{product.title}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{product.sku}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{product.category}
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{formatPrice(product.price)}
								</td>
								<td className="px-4 py-3">
									<div className="flex flex-wrap gap-1">
										{product.tags.map((tag) => (
											<span
												className="rounded-full bg-slate-600 px-2 py-0.5 text-white text-xs dark:bg-slate-500"
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>
								</td>
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{product.createdAt}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<Link
											className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-700"
											href={`/dashboard/products/update/${product.id}`}
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
