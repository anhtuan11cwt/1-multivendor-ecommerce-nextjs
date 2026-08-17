"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { makePostRequest } from "@/lib/api-request";
import { staffSchema } from "@/lib/schemas";

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

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			const result = await makePostRequest({
				data,
				endpoint: "api/staff",
				resourceName: "Nhân viên",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/staff");
			}
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
						isRequired
						label="Mật khẩu"
						name="password"
						register={register}
						type="password"
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
						label="Số điện thoại"
						name="phone"
						register={register}
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
