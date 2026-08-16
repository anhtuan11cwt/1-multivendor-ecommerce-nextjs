"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { makePutRequest } from "@/lib/api-request";
import { farmerSchema } from "@/lib/schemas";
import { restrictDigits } from "@/lib/utils";

const mockData = {
	1: {
		code: "LFF-NVA-250801100000",
		contactPerson: "Minh",
		contactPersonPhone: "0987654321",
		email: "an@example.com",
		name: "Nguyễn Văn An",
		notes: "",
		paymentTerms: "Thanh toán sau 30 ngày",
		phone: "0901234567",
		physicalAddress: "Long An",
	},
};

export default function UpdateFarmerPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const farmer = mockData[id] || {
		code: "",
		contactPerson: "",
		contactPersonPhone: "",
		email: "",
		name: "",
		notes: "",
		paymentTerms: "",
		phone: "",
		physicalAddress: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			contactPerson: farmer.contactPerson,
			contactPersonPhone: farmer.contactPersonPhone,
			email: farmer.email,
			name: farmer.name,
			notes: farmer.notes,
			paymentTerms: farmer.paymentTerms,
			phone: farmer.phone,
			physicalAddress: farmer.physicalAddress,
		},
		resolver: zodResolver(farmerSchema),
	});
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			const payload = { id, ...data, code: farmer.code };
			const result = await makePutRequest({
				data: payload,
				endpoint: "api/farmers",
				resourceName: "Nông dân",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/farmers");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa nông dân - ${farmer.name}`}
			/>

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
						label="Tên nông dân"
						name="name"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						inputMode="numeric"
						isRequired
						label="Số điện thoại"
						maxLength={10}
						name="phone"
						onBeforeInput={restrictDigits}
						register={register}
						type="tel"
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
						label="Địa chỉ"
						name="physicalAddress"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="Người liên hệ"
						name="contactPerson"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						inputMode="numeric"
						label="Số điện thoại người liên hệ"
						maxLength={10}
						name="contactPersonPhone"
						onBeforeInput={restrictDigits}
						register={register}
						type="tel"
					/>
					<TextAreaInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Điều khoản thanh toán"
						name="paymentTerms"
						register={register}
					/>
					<TextAreaInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						isRequired={false}
						label="Ghi chú"
						name="notes"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<SubmitButton
						buttonTitle="Cập nhật"
						isLoading={loading}
						loadingButtonTitle="Đang cập nhật..."
					/>
					<button
						className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700"
						disabled={loading}
						onClick={() => router.back()}
						type="button"
					>
						Hủy
					</button>
				</div>
			</form>
		</div>
	);
}
