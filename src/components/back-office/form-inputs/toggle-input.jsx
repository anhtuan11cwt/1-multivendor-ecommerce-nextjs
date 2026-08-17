"use client";

import { useWatch } from "react-hook-form";

export default function ToggleInput({
	label,
	name,
	register,
	control,
	trueTitle = "Đang hoạt động",
	falseTitle = "Bản nháp",
	disabled = false,
	className,
}) {
	const value = useWatch({ control, name });

	return (
		<div className={className}>
			<label
				className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300"
				htmlFor={name}
			>
				{label}
			</label>
			<div
				className={`flex flex-wrap items-center gap-3 transition ${disabled ? "pointer-events-none opacity-50" : ""}`}
			>
				<label className="relative inline-flex cursor-pointer items-center">
					<input
						className="peer sr-only"
						disabled={disabled}
						id={name}
						type="checkbox"
						{...register(name)}
					/>
					<div className="peer h-6 w-11 rounded-full bg-slate-300 transition after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-5 dark:bg-slate-600 dark:peer-checked:bg-emerald-600" />
				</label>
				<span className="font-medium text-slate-700 text-sm dark:text-slate-300">
					{value ? trueTitle : falseTitle}
				</span>
			</div>
		</div>
	);
}
