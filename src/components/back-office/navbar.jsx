"use client";

import {
	Bell,
	LayoutDashboard,
	LogOut,
	Menu,
	Moon,
	PackageX,
	Settings,
	ShoppingCart,
	Sun,
	TrendingUp,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/use-theme";

const initialNotifications = [
	{
		description: "Bắp cải sắp hết trong kho Chợ Bến Thành",
		icon: PackageX,
		iconBg: "bg-red-500",
		id: 1,
		time: "2 giờ trước",
		title: "Hết hàng",
	},
	{
		description: "Đơn #1024 vừa được đặt bởi khách hàng Minh",
		icon: ShoppingCart,
		iconBg: "bg-sky-500",
		id: 2,
		time: "5 giờ trước",
		title: "Đơn hàng mới",
	},
	{
		description: "Doanh thu tuần này tăng 12% so với tuần trước",
		icon: TrendingUp,
		iconBg: "bg-emerald-500",
		id: 3,
		time: "1 ngày trước",
		title: "Doanh thu tuần",
	},
];

export default function Navbar({ onMenuClick }) {
	const { dark, toggleTheme } = useTheme();
	const [notifications, setNotifications] = useState(initialNotifications);

	function removeNotification(id) {
		setNotifications((list) => list.filter((item) => item.id !== id));
	}

	return (
		<header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-slate-700/60 border-b bg-slate-900 px-4 text-slate-50 lg:left-64 lg:px-8 dark:bg-slate-950">
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

				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label="Thông báo"
						className="relative rounded-md p-2 transition-colors hover:bg-slate-700"
						render={<button type="button" />}
					>
						<Bell className="size-5" />
						{notifications.length > 0 && (
							<span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 font-bold text-[10px] text-white">
								{notifications.length}
							</span>
						)}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Thông báo</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{notifications.map((item) => (
								<DropdownMenuItem
									className="flex flex-col items-start gap-1 py-2.5"
									key={item.id}
								>
									<div className="flex w-full items-center justify-between gap-2">
										<div className="flex items-center gap-2">
											<span
												className={`flex size-7 shrink-0 items-center justify-center rounded-full text-white ${item.iconBg}`}
											>
												<item.icon className="size-4" />
											</span>
											<span className="font-semibold">{item.title}</span>
										</div>
										<button
											aria-label={`Đóng thông báo ${item.title}`}
											className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
											onClick={() => removeNotification(item.id)}
											type="button"
										>
											<X className="size-4" />
										</button>
									</div>
									<p className="text-muted-foreground text-sm">
										{item.description}
									</p>
									<span className="text-muted-foreground text-xs">
										{item.time}
									</span>
								</DropdownMenuItem>
							))}
							{notifications.length === 0 && (
								<div className="px-2 py-6 text-center text-muted-foreground text-sm">
									Không có thông báo mới
								</div>
							)}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label="Tài khoản"
						className="flex size-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-sm transition-colors hover:bg-emerald-500"
						render={<button type="button" />}
					>
						AD
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem render={<Link href="/dashboard" />}>
								<LayoutDashboard className="size-4" />
								Bảng điều khiển
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="size-4" />
								Chỉnh sửa hồ sơ
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem variant="destructive">
								<LogOut className="size-4" />
								Đăng xuất
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
