"use client";

import { HelpCircle, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HelpModal from "@/components/front-end/help-modal";
import SearchForm from "@/components/front-end/search-form";
import ThemeSwitcher from "@/components/front-end/theme-switcher";

const iconLinkClassName =
	"inline-flex size-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-200/70 dark:text-slate-100 dark:hover:bg-slate-700";

export default function Navbar() {
	const [helpOpen, setHelpOpen] = useState(false);

	return (
		<>
			<header className="sticky top-0 z-50 border-slate-200 border-b bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-gray-800/90">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex h-16 items-center justify-between gap-4">
						<Link aria-label="Trang chủ" className="shrink-0" href="/">
							<Image
								alt="Logo"
								className="h-auto dark:invert"
								height={30}
								priority
								src="/logo.svg"
								unoptimized
								width={132}
							/>
						</Link>
						<div className="hidden min-w-0 flex-1 justify-center md:flex">
							<SearchForm className="max-w-xl" />
						</div>
						<div className="flex shrink-0 items-center gap-1 lg:gap-1.5">
							<Link
								aria-label="Đăng nhập"
								className={iconLinkClassName}
								href="/login"
							>
								<User className="size-5" />
							</Link>
							<button
								aria-label="Trợ giúp"
								className={iconLinkClassName}
								onClick={() => setHelpOpen(true)}
								type="button"
							>
								<HelpCircle className="size-5" />
							</button>
							<Link
								aria-label="Giỏ hàng"
								className={iconLinkClassName}
								href="/cart"
							>
								<ShoppingCart className="size-5" />
							</Link>
							<ThemeSwitcher />
						</div>
					</div>
					<div className="pb-3 md:hidden">
						<SearchForm />
					</div>
				</div>
			</header>
			<HelpModal onClose={() => setHelpOpen(false)} show={helpOpen} />
		</>
	);
}
