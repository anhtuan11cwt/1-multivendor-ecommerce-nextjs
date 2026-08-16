"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { makePostRequest } from "@/lib/api-request";
import { generateCouponCode } from "@/lib/generate-coupon-code";
import { couponSchema, getTodayString } from "@/lib/schemas";

export default function NewCouponPage() {
	const router = useRouter();
	const {
		register,
		setValue,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(couponSchema),
	});
	const [loading, setLoading] = useState(false);

	const watchedTitle = useWatch({ control, name: "title" });
	const watchedExpiryDate = useWatch({ control, name: "expiryDate" });
	const generatedCode = generateCouponCode(watchedTitle, watchedExpiryDate);

	useEffect(() => {
		setValue("couponCode", generatedCode);
	}, [generatedCode, setValue]);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			const payload = {
				...data,
				couponCode: generateCouponCode(data.title, data.expiryDate),
			};
			const result = await makePostRequest({
				data: payload,
				endpoint: "api/coupons",
				resourceName: "Mã giảm giá",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/coupons");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo mã giảm giá mới" />

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
						label="Tiêu đề chiến dịch"
						name="title"
						register={register}
					/>
					<TextInput
						disabled
						errors={errors}
						label="Mã giảm giá"
						name="couponCode"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Ngày hết hạn"
						min={getTodayString()}
						name="expiryDate"
						register={register}
						type="date"
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo mã giảm giá"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
