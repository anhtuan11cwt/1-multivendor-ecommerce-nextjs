import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/back-office/page-header";

const mockFarmers = [
	{
		code: "LFF-NVA-250801100000",
		createdAt: "01/08/2025",
		email: "an@example.com",
		id: "1",
		name: "Nguyễn Văn An",
		phone: "0901234567",
	},
];

export default function FarmersPage() {
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
							<th className="px-4 py-3 font-medium">Ngày tạo</th>
							<th className="px-4 py-3 font-medium">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{mockFarmers.map((farmer, i) => (
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
								<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
									{farmer.createdAt}
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
					</tbody>
				</table>
			</div>
		</div>
	);
}
