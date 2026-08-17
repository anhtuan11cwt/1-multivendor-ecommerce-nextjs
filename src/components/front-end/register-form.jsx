"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { userSchema } from "@/lib/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function RegisterForm({ userRole = "USER" }) {
	const router = useRouter();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userSchema),
	});
	const [loading, setLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		setEmailError("");
		try {
			const res = await fetch(`${BASE_URL}/api/users`, {
				body: JSON.stringify({ ...data, role: userRole }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const result = await res.json();
			if (res.status === 409) {
				setEmailError(result.message || "Người dùng đã tồn tại");
				return;
			}
			if (!res.ok) {
				throw new Error(result.message || "Có lỗi xảy ra");
			}
			toast.success("Đăng ký thành công!");
			reset();
			if (userRole === "FARMER") {
				router.push(`/onboarding/${result.data.id}`);
			} else {
				router.push("/");
			}
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
				<TextInput
					disabled={loading}
					errors={errors}
					isRequired
					label="Họ và tên"
					name="name"
					register={register}
				/>
				<div>
					<TextInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Email"
						name="email"
						register={register}
						type="email"
					/>
					{emailError && (
						<p className="mt-1 text-red-500 text-sm">{emailError}</p>
					)}
				</div>
				<TextInput
					disabled={loading}
					errors={errors}
					isRequired
					label="Mật khẩu"
					name="password"
					register={register}
					suffix={
						<button
							aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
							className="text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-500 dark:hover:text-slate-200"
							disabled={loading}
							onClick={() => setShowPassword((value) => !value)}
							type="button"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					}
					type={showPassword ? "text" : "password"}
				/>
				<p className="text-slate-500 text-xs dark:text-slate-400">
					Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
				</p>
			</div>

			<div className="mt-6 flex justify-end">
				<SubmitButton
					buttonTitle="Đăng ký"
					className="w-full"
					isLoading={loading}
					loadingButtonTitle="Đang đăng ký..."
				/>
			</div>

			<p
				className={`mt-6 text-center text-slate-600 text-sm transition dark:text-slate-400 ${loading ? "pointer-events-none opacity-50" : ""}`}
			>
				{userRole === "FARMER" ? (
					<>
						Bạn là khách hàng?{" "}
						<Link
							className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
							href="/register"
						>
							Đăng ký tài khoản thường
						</Link>
					</>
				) : (
					<>
						Đã có tài khoản?{" "}
						<Link
							className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
							href="/register-farmer"
						>
							Đăng ký nông dân
						</Link>
					</>
				)}
			</p>
		</form>
	);
}
