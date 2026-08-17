export default function TextInput({
	label,
	name,
	register,
	errors,
	isRequired = false,
	type = "text",
	disabled = false,
	className,
	suffix,
	...rest
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
			<div className="relative">
				<input
					disabled={disabled}
					id={name}
					type={type}
					{...rest}
					{...register(name)}
					className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 text-sm outline-none ring-slate-500 transition focus:border-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:placeholder-slate-400 dark:ring-slate-500 dark:focus:border-slate-500 ${suffix ? "pr-10" : ""} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
				/>
				{suffix && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						{suffix}
					</div>
				)}
			</div>
			{errors[name] && (
				<p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
			)}
		</div>
	);
}
