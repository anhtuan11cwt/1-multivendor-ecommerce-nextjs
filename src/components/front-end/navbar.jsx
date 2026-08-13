"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks } from "@/components/front-end/nav-links";
import { useTheme } from "@/lib/use-theme";
import { cn } from "@/lib/utils";

export default function Navbar() {
	const { dark, toggleTheme } = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (!menuOpen) return;
		function onKeyDown(event) {
			if (event.key === "Escape") setMenuOpen(false);
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	return (
		<header className="sticky top-0 z-50 border-slate-200 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-8">
				<Link
					className="font-bold text-lg text-slate-900 tracking-tight dark:text-slate-50"
					href="/"
				>
					<span className="text-emerald-500 dark:text-emerald-400">E-</span>
					Commerce
				</Link>
				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Link
							className={cn(
								"rounded-md px-3 py-2 font-medium text-sm transition-colors",
								link.primary
									? "bg-emerald-600 text-white hover:bg-emerald-500"
									: "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
							)}
							href={link.href}
							key={link.href}
						>
							{link.title}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-1">
					<button
						aria-label={
							dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
						}
						className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
						onClick={toggleTheme}
						type="button"
					>
						{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
					</button>
					<button
						aria-expanded={menuOpen}
						aria-label="Mở menu"
						className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
						onClick={() => setMenuOpen((value) => !value)}
						type="button"
					>
						{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
					</button>
				</div>
			</div>
			{menuOpen && (
				<div className="border-slate-200 border-t bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
					<nav className="flex flex-col gap-1">
						{navLinks.map((link) => (
							<Link
								className={cn(
									"rounded-md px-3 py-2.5 font-medium text-sm transition-colors",
									link.primary
										? "bg-emerald-600 text-center text-white hover:bg-emerald-500"
										: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
								)}
								href={link.href}
								key={link.href}
								onClick={() => setMenuOpen(false)}
							>
								{link.title}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
