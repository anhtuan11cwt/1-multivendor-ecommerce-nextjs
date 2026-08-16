import { Plus } from "lucide-react";
import Link from "next/link";

export default function PageHeader({ heading, linkTitle, href }) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="font-bold text-2xl text-slate-900 dark:text-slate-100">
				{heading}
			</h2>
			{href && (
				<Link
					className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-sm text-white shadow transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
					href={href}
				>
					<Plus size={18} />
					{linkTitle}
				</Link>
			)}
		</div>
	);
}
