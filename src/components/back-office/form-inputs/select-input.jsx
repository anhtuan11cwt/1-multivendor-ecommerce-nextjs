export default function SelectInput({
	label,
	name,
	register,
	errors,
	options = [],
	isRequired = false,
	disabled = false,
	placeholder = "Chọn...",
	multiple = false,
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
				className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 text-sm outline-none ring-slate-500 transition [color-scheme:light] focus:border-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-500 dark:focus:border-slate-500 dark:[color-scheme:dark] ${multiple ? "min-h-[110px]" : ""}`}
				disabled={disabled}
				id={name}
				multiple={multiple}
				{...register(name)}
			>
				{!multiple && <option value="">{placeholder}</option>}
				{options.map((option) => (
					<option key={option.id} value={option.id}>
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
