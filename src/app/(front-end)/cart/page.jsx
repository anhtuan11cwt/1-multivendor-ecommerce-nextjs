"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/front-end/breadcrumb";
import QuantitySelector from "@/components/front-end/quantity-selector";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/lib/cart-context";
import { formatVND } from "@/lib/frontend-data";

const TAX_RATE = 0.1;
const SHIPPING_FEE = 15000;

function CartItemDelete({ item }) {
	const { removeItem } = useCart();
	return (
		<AlertDialog>
			<AlertDialogTrigger className="inline-flex items-center gap-1 text-red-500 text-xs transition-colors hover:text-red-700 dark:hover:text-red-400">
				<Trash2 className="size-4" />
				Xóa
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
					<AlertDialogDescription>
						Bạn có chắc muốn xóa &ldquo;{item.title}&rdquo; khỏi giỏ hàng không?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
						onClick={() => removeItem(item.id)}
					>
						Xóa
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default function CartPage() {
	const { items, subtotal, updateQuantity } = useCart();
	const tax = subtotal * TAX_RATE;
	const total = subtotal + tax + (items.length > 0 ? SHIPPING_FEE : 0);

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<Breadcrumb items={[{ label: "Giỏ hàng" }]} />
			<h1 className="mb-6 font-bold text-2xl text-slate-900 dark:text-slate-100">
				Giỏ hàng
			</h1>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div className="lg:col-span-8">
					{items.length === 0 ? (
						<div className="flex flex-col items-center rounded-xl border border-slate-300 border-dashed bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
							<ShoppingCart className="size-12 text-slate-300 dark:text-slate-600" />
							<p className="mt-4 font-medium text-slate-700 dark:text-slate-200">
								Giỏ hàng của bạn đang trống
							</p>
							<Link
								className="mt-4 rounded-lg bg-lime-600 px-6 py-2.5 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
								href="/"
							>
								Tiếp tục mua sắm
							</Link>
						</div>
					) : (
						<>
							<div className="hidden items-center border-slate-200 border-b pb-3 font-semibold text-slate-500 text-sm uppercase md:flex dark:border-slate-700 dark:text-slate-400">
								<span className="w-2/5">Sản phẩm</span>
								<span className="w-1/5 text-center">Số lượng</span>
								<span className="w-1/5 text-right">Giá</span>
								<span aria-hidden="true" className="w-1/5" />
							</div>
							<ul className="divide-y divide-slate-200 dark:divide-slate-700">
								{items.map((item) => (
									<li
										className="flex flex-col gap-4 py-5 md:flex-row md:items-center"
										key={item.id}
									>
										<div className="flex items-center gap-4 md:w-2/5">
											<Link
												className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-lg"
												href={`/products/${item.slug}`}
											>
												<Image
													alt={item.title}
													className="object-cover"
													fill
													sizes="80px"
													src={item.imageUrl || "/box_icon.svg"}
													unoptimized
												/>
											</Link>
											<div className="min-w-0 flex-1">
												<Link
													className="line-clamp-2 font-medium text-slate-900 text-sm hover:text-lime-600 dark:text-slate-200 dark:hover:text-lime-400"
													href={`/products/${item.slug}`}
												>
													{item.title}
												</Link>
												{item.categoryTitle && (
													<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
														{item.categoryTitle}
													</p>
												)}
												<div className="mt-3 flex items-center justify-between gap-3 md:hidden">
													<QuantitySelector
														onChange={(qty) => updateQuantity(item.id, qty)}
														quantity={item.quantity}
														size="sm"
													/>
													<div className="flex items-center gap-3">
														<span className="font-semibold text-slate-900 dark:text-slate-100">
															{formatVND(item.price * item.quantity)}
														</span>
														<CartItemDelete item={item} />
													</div>
												</div>
											</div>
										</div>
										<div className="hidden md:flex md:w-1/5 md:items-center md:justify-center">
											<QuantitySelector
												onChange={(qty) => updateQuantity(item.id, qty)}
												quantity={item.quantity}
												size="sm"
											/>
										</div>
										<div className="hidden md:flex md:w-1/5 md:items-center md:justify-end">
											<span className="font-semibold text-slate-900 dark:text-slate-100">
												{formatVND(item.price * item.quantity)}
											</span>
										</div>
										<div className="hidden md:flex md:w-1/5 md:items-center md:justify-end">
											<CartItemDelete item={item} />
										</div>
									</li>
								))}
							</ul>
						</>
					)}
				</div>

				<div className="lg:col-span-4">
					<aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
						<h2 className="border-slate-200 border-b py-3 font-bold text-slate-900 text-xl dark:border-slate-700 dark:text-slate-100">
							Tổng đơn hàng
						</h2>
						<dl className="space-y-3 py-4 text-sm">
							<div className="flex items-center justify-between">
								<dt className="text-slate-500 dark:text-slate-400">Tạm tính</dt>
								<dd className="font-medium text-slate-900 dark:text-slate-100">
									{formatVND(subtotal)}
								</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-slate-500 dark:text-slate-400">Thuế</dt>
								<dd className="font-medium text-slate-900 dark:text-slate-100">
									{formatVND(tax)}
								</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-slate-500 dark:text-slate-400">
									Vận chuyển
								</dt>
								<dd className="font-medium text-slate-900 dark:text-slate-100">
									{items.length > 0 ? formatVND(SHIPPING_FEE) : "0₫"}
								</dd>
							</div>
							<div className="flex items-center justify-between border-slate-200 border-t pt-3 font-bold text-slate-900 dark:border-slate-700 dark:text-slate-100">
								<dt>Tổng cộng</dt>
								<dd>{formatVND(total)}</dd>
							</div>
						</dl>
						<Link
							className="block w-full rounded-lg bg-lime-600 py-3 text-center font-semibold text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
							href="/checkout"
						>
							Tiếp tục thanh toán
						</Link>
						<form className="mt-4 flex items-center gap-2">
							<input
								aria-label="Mã giảm giá"
								className="w-3/4 min-w-0 rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-slate-900 text-sm outline-none focus:border-lime-500 dark:border-slate-600 dark:text-slate-100"
								placeholder="Nhập mã giảm giá"
								type="text"
							/>
							<button
								className="w-1/4 shrink-0 rounded-lg bg-slate-900 px-2 py-2.5 font-medium text-white text-xs transition-colors hover:bg-slate-700 sm:text-sm dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
								type="submit"
							>
								Áp dụng
							</button>
						</form>
					</aside>
				</div>
			</div>
		</div>
	);
}
