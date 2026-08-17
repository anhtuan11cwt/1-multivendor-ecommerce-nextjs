"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/lib/use-theme";

export default function ThemeSwitcher() {
	const { dark, toggleTheme } = useTheme();

	return (
		<button
			aria-label={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
			className="inline-flex size-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-200/70 dark:text-slate-100 dark:hover:bg-slate-700"
			onClick={toggleTheme}
			type="button"
		>
			{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
		</button>
	);
}
