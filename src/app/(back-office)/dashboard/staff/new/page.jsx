"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { makePostRequest } from "@/lib/api-request";
import { getMaxBirthDateString, staffSchema } from "@/lib/schemas";
import { restrictDigits } from "@/lib/utils";

export default function NewStaffPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(staffSchema),
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(true);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			await makePostRequest({
				data,
				endpoint: "api/staff",
				redirect: () => router.push("/dashboard/staff"),
				resourceName: "Nhân viên",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo nhân viên mới" />

			<form
				className="rounded-lg bg-white p-6 shadow dark:bg-slate-800"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-6">
					<TextInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						isRequired
						label="Họ và tên"
						name="fullName"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						inputMode="numeric"
						label="Số CCCD"
						maxLength={12}
						name="cccd"
						onBeforeInput={restrictDigits}
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="Ngày sinh"
						max={getMaxBirthDateString()}
						name="dateOfBirth"
						register={register}
						type="date"
					/>
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
					<TextInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Email"
						name="email"
						register={register}
						type="email"
					/>
					<TextInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						inputMode="numeric"
						label="Số điện thoại"
						maxLength={10}
						name="phone"
						onBeforeInput={restrictDigits}
						register={register}
						type="tel"
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo nhân viên"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
