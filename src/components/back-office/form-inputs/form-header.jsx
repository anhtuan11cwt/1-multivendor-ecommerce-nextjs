"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormHeader({ title, isLoading = false }) {
	const router = useRouter();
	return (
		<div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow dark:bg-slate-800">
			<h2 className="font-bold text-slate-900 text-xl dark:text-slate-100">
				{title}
			</h2>
			<button
				className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
				disabled={isLoading}
				onClick={() => router.back()}
				type="button"
			>
				<X size={20} />
			</button>
		</div>
	);
}
