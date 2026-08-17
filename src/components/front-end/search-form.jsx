import { Search } from "lucide-react";

export default function SearchForm({ className }) {
	return (
		<form action="/products" className={`relative w-full ${className || ""}`}>
			<label className="sr-only" htmlFor="site-search">
				Tìm kiếm
			</label>
			<div className="relative">
				<Search
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-slate-400 dark:text-slate-500"
				/>
				<input
					autoComplete="off"
					className="w-full rounded-md border border-slate-300 bg-white py-2.5 pr-24 pl-9 text-slate-900 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/30 dark:placeholder:text-slate-400"
					id="site-search"
					name="q"
					placeholder="Tìm kiếm sản phẩm, danh mục..."
					type="search"
				/>
				<button
					aria-label="Tìm kiếm"
					className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1.5 rounded-md bg-lime-600 px-3.5 font-medium text-sm text-white transition-colors hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500/40 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
					type="submit"
				>
					<Search className="size-4" />
					<span className="hidden sm:inline">Tìm</span>
				</button>
			</div>
		</form>
	);
}
