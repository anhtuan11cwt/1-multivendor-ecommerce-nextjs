export default function SelectInput({
	label,
	name,
	register,
	errors,
	options = [],
	isRequired = false,
	disabled = false,
	placeholder = "Chọn...",
	className,
}) {
	return (
		<div className={className}>
			<label
				className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300"
				htmlFor={name}
			>
				{label}
				{isRequired && <span className="ml-1 text-red-500">*</span>}
			</label>
			<select
				aria-label={label}
				disabled={disabled}
				id={name}
				{...register(name)}
				className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 text-sm outline-none ring-slate-500 transition focus:border-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:ring-slate-500 dark:focus:border-slate-500"
			>
				<option
					className="bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100"
					value=""
				>
					{placeholder}
				</option>
				{options.map((option) => (
					<option
						className="bg-white text-slate-900 dark:bg-slate-700 dark:text-slate-100"
						key={option.id}
						value={option.id}
					>
						{option.title}
					</option>
				))}
			</select>
			{errors[name] && (
				<p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
			)}
		</div>
	);
}
