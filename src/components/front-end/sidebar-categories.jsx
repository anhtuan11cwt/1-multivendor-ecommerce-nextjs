import Image from "next/image";
import Link from "next/link";

export default function SideBarCategories({ categories }) {
	return (
		<aside className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-md dark:border-gray-600 dark:bg-slate-700">
			<h2 className="border-slate-200 border-b bg-slate-100 px-4 py-3 font-semibold text-slate-900 text-sm dark:border-gray-600 dark:bg-slate-800 dark:text-slate-100">
				Mua theo danh mục
			</h2>
			<div className="max-h-[300px] overflow-y-auto">
				{categories.map((category) => (
					<Link
						className="flex items-center gap-3 px-4 py-2.5 text-slate-700 text-sm transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-600"
						href={`/categories/${category.slug}`}
						key={category.id}
					>
						<Image
							alt={category.title}
							className="size-6 shrink-0 rounded-sm object-cover"
							height={24}
							src={category.imageUrl || "/box_icon.svg"}
							unoptimized
							width={24}
						/>
						<span className="truncate">{category.title}</span>
					</Link>
				))}
			</div>
		</aside>
	);
}
