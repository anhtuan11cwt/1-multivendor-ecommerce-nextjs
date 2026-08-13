export default function SmallCard({ title, number, icon: Icon, iconBg }) {
	return (
		<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
			<div
				className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${iconBg}`}
			>
				<Icon className="size-5" />
			</div>
			<div>
				<h4 className="font-medium text-slate-500 text-sm dark:text-slate-400">
					{title}
				</h4>
				<h2 className="font-bold text-slate-900 text-xl dark:text-slate-100">
					{number}
				</h2>
			</div>
		</div>
	);
}
