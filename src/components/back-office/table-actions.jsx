"use client";

import { Download, Search, Trash2 } from "lucide-react";

export default function TableActions({ onBulkDelete }) {
	return (
		<div className="my-4 flex flex-wrap items-center gap-3">
			<button
				className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
				type="button"
			>
				<Download size={16} />
				Xuất
			</button>

			<div className="relative flex-1">
				<Search
					className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
					size={16}
				/>
				<input
					className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-9 text-slate-900 text-sm outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:placeholder-slate-400"
					placeholder="Tìm kiếm..."
					type="text"
				/>
			</div>

			<button
				className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
				onClick={onBulkDelete}
				type="button"
			>
				<Trash2 size={16} />
				Xóa
			</button>
		</div>
	);
}
