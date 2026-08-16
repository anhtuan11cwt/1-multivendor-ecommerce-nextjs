"use client";

import {
	ChevronDown,
	FolderTree,
	Image,
	LayoutDashboard,
	LogOut,
	Package,
	Settings,
	ShoppingCart,
	Store,
	TicketPercent,
	UserCog,
	Users,
	Wheat,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const catalogItems = [
	{ href: "/dashboard/products", icon: Package, title: "Sản phẩm" },
	{ href: "/dashboard/categories", icon: FolderTree, title: "Danh mục" },
	{ href: "/dashboard/coupons", icon: TicketPercent, title: "Mã giảm giá" },
	{ href: "/dashboard/banners", icon: Image, title: "Banner cửa hàng" },
];

const navItems = [
	{ href: "/dashboard/customers", icon: Users, title: "Khách hàng" },
	{ href: "/dashboard/markets", icon: Store, title: "Chợ" },
	{ href: "/dashboard/farmers", icon: Wheat, title: "Nông dân" },
	{ href: "/dashboard/orders", icon: ShoppingCart, title: "Đơn hàng" },
	{ href: "/dashboard/staff", icon: UserCog, title: "Nhân viên" },
	{ href: "/dashboard/settings", icon: Settings, title: "Cài đặt" },
];

export default function Sidebar({ open, onClose }) {
	const pathname = usePathname();
	const isCatalogActive = catalogItems.some((item) =>
		pathname.startsWith(item.href),
	);
	const [catalogOpen, setCatalogOpen] = useState(isCatalogActive);

	return (
		<>
			{open && (
				<div
					aria-hidden="true"
					className="fixed inset-0 z-40 bg-black/60 lg:hidden"
					onClick={onClose}
				/>
			)}
			<aside
				className={cn(
					"fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-slate-800 text-slate-50 shadow-xl transition-transform duration-300 dark:bg-slate-900",
					open ? "translate-x-0" : "-translate-x-full",
					"lg:z-30 lg:translate-x-0",
				)}
			>
				<div className="flex h-16 items-center border-slate-700/60 border-b px-6">
					<h2 className="font-bold text-lg tracking-tight">
						<span className="text-emerald-400">E-</span>Commerce
					</h2>
				</div>
				<nav className="flex-1 space-y-3 overflow-y-auto px-4 py-6">
					<NavLink href="/dashboard" icon={LayoutDashboard} onClick={onClose}>
						Bảng điều khiển
					</NavLink>

					<div>
						<button
							aria-expanded={catalogOpen}
							className={cn(
								"flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm transition-colors",
								isCatalogActive
									? "bg-emerald-600 text-white"
									: "text-slate-300 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-800",
							)}
							onClick={() => setCatalogOpen((v) => !v)}
							type="button"
						>
							<Package className="size-4 shrink-0" />
							<span className="flex-1 text-left">Danh mục</span>
							<ChevronDown
								className={cn(
									"size-4 transition-transform duration-200",
									catalogOpen && "rotate-180",
								)}
							/>
						</button>
						{catalogOpen && (
							<div className="mt-1 space-y-1 border-slate-700 border-l pl-4">
								{catalogItems.map((item) => (
									<NavLink
										href={item.href}
										icon={item.icon}
										key={item.href}
										onClick={onClose}
									>
										{item.title}
									</NavLink>
								))}
							</div>
						)}
					</div>

					{navItems.map((item) => (
						<NavLink
							href={item.href}
							icon={item.icon}
							key={item.href}
							onClick={onClose}
						>
							{item.title}
						</NavLink>
					))}
				</nav>
				<div className="border-slate-700/60 border-t p-4">
					<button
						className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-medium text-red-400 text-sm transition-colors hover:bg-red-500/10 hover:text-red-300"
						onClick={onClose}
						type="button"
					>
						<LogOut className="size-4 shrink-0" />
						Đăng xuất
					</button>
				</div>
			</aside>
		</>
	);
}

function NavLink({ href, icon: Icon, onClick, children }) {
	const pathname = usePathname();
	const active =
		href === "/dashboard" ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			className={cn(
				"flex items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm transition-colors",
				active
					? "bg-emerald-600 text-white"
					: "text-slate-300 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-800",
			)}
			href={href}
			onClick={onClick}
		>
			<Icon className="size-4 shrink-0" />
			{children}
		</Link>
	);
}
