"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginSchema } from "@/lib/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const inputClassName =
	"w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/30 disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/30";

export default function LoginForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/api/auth/login`, {
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const result = await res.json();
			if (!res.ok) {
				throw new Error(result.message || "Đăng nhập thất bại");
			}
			toast.success("Đăng nhập thành công!");
			router.push("/");
		} catch (error) {
			toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			className="rounded-lg bg-white p-6 shadow dark:bg-slate-800"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-5">
				<div>
					<label
						className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className={inputClassName}
						disabled={loading}
						id="email"
						type="email"
						{...register("email")}
					/>
					{errors.email && (
						<p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
					)}
				</div>
				<div>
					<label
						className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300"
						htmlFor="password"
					>
						Mật khẩu
					</label>
					<div className="relative">
						<input
							className={`${inputClassName} pr-10`}
							disabled={loading}
							id="password"
							type={showPassword ? "text" : "password"}
							{...register("password")}
						/>
						<button
							aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-500 dark:hover:text-slate-200"
							disabled={loading}
							onClick={() => setShowPassword((value) => !value)}
							type="button"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					{errors.password && (
						<p className="mt-1 text-red-500 text-sm">
							{errors.password.message}
						</p>
					)}
				</div>
			</div>

			<button
				className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-medium text-sm text-white transition hover:bg-lime-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
				disabled={loading}
				type="submit"
			>
				{loading && <Loader2 className="size-4 animate-spin" />}
				{loading ? "Đang đăng nhập..." : "Đăng nhập"}
			</button>

			<div
				className={`mt-6 flex flex-col items-center gap-2 text-center text-slate-600 text-sm transition dark:text-slate-400 ${loading ? "pointer-events-none opacity-50" : ""}`}
			>
				<p>
					Bạn chưa có tài khoản?{" "}
					<Link
						className="font-medium text-lime-600 hover:text-lime-700 dark:text-lime-400"
						href="/register"
					>
						Đăng ký
					</Link>
				</p>
				<p>
					Bạn là nông dân?{" "}
					<Link
						className="font-medium text-lime-600 hover:text-lime-700 dark:text-lime-400"
						href="/register-farmer"
					>
						Đăng ký nông dân
					</Link>
				</p>
			</div>
		</form>
	);
}
