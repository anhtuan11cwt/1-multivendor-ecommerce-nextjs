"use client";

import { Bell, Menu, Moon, Sun, User } from "lucide-react";

import { useTheme } from "@/lib/use-theme";

export default function Navbar({ onMenuClick }) {
	const { dark, toggleTheme } = useTheme();

	return (
		<header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-slate-700/60 border-b bg-slate-900 px-4 text-slate-50 lg:left-60 lg:px-8 dark:bg-slate-950">
			<button
				aria-label="Mở menu"
				className="rounded-md p-2 transition-colors hover:bg-slate-700 lg:hidden"
				onClick={onMenuClick}
				type="button"
			>
				<Menu className="size-5" />
			</button>
			<div className="hidden font-medium text-slate-300 lg:block">Quản trị</div>
			<div className="flex items-center gap-1 sm:gap-2">
				<button
					aria-label={
						dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
					}
					className="rounded-md p-2 transition-colors hover:bg-slate-700"
					onClick={toggleTheme}
					type="button"
				>
					{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
				</button>
				<button
					aria-label="Thông báo"
					className="relative rounded-md p-2 transition-colors hover:bg-slate-700"
					type="button"
				>
					<Bell className="size-5" />
					<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-400" />
				</button>
				<button
					aria-label="Tài khoản"
					className="flex size-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-sm transition-colors hover:bg-emerald-500"
					type="button"
				>
					<User className="size-4" />
				</button>
			</div>
		</header>
	);
}
