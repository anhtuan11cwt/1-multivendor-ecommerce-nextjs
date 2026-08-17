import Image from "next/image";
import Link from "next/link";

export default function TrainingCard({ className, training }) {
	return (
		<article
			className={`flex flex-col overflow-hidden rounded-lg bg-slate-100 shadow-sm dark:bg-slate-800 ${className || ""}`}
		>
			<Link
				className="relative block h-40 w-full overflow-hidden"
				href={`/trainings/${training.slug}`}
			>
				<Image
					alt={training.title}
					className="object-cover"
					fill
					sizes="(max-width: 640px) 85vw, 31vw"
					src={training.imageUrl || "/box_icon.svg"}
					unoptimized
				/>
			</Link>
			<div className="flex flex-1 flex-col p-4">
				<Link
					className="font-semibold text-slate-900 hover:underline dark:text-slate-100"
					href={`/trainings/${training.slug}`}
				>
					{training.title}
				</Link>
				<p className="mt-2 line-clamp-3 text-slate-600 text-sm dark:text-slate-400">
					{training.description}
				</p>
				<div className="mt-4 flex items-center justify-between gap-2 pt-1">
					<Link
						className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white text-xs transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
						href={`/trainings/${training.slug}`}
					>
						Đọc thêm
					</Link>
					<Link
						className="rounded-md border border-lime-600 px-4 py-2 font-medium text-lime-700 text-xs transition-colors hover:bg-lime-600 hover:text-white dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-500 dark:hover:text-slate-950"
						href="/contact"
					>
						Tư vấn
					</Link>
				</div>
			</div>
		</article>
	);
}
