"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/back-office/navbar";
import Sidebar from "@/components/back-office/sidebar";

export default function AdminShell({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		if (!sidebarOpen) return;
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = original;
		};
	}, [sidebarOpen]);

	useEffect(() => {
		function onKeyDown(event) {
			if (event.key === "Escape") setSidebarOpen(false);
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<div className="min-h-screen bg-slate-100 dark:bg-slate-900">
			<Navbar onMenuClick={() => setSidebarOpen(true)} />
			<Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
			<main className="min-h-screen pt-16 lg:pl-60">
				<div className="p-4 lg:p-8">{children}</div>
			</main>
		</div>
	);
}
