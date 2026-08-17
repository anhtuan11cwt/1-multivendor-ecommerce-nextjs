"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { farmerSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";
import { restrictDigits } from "@/lib/utils";

export default function NewFarmerPage() {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: false },
		resolver: zodResolver(farmerSchema),
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let profileImageUrl = "";
			if (file) {
				profileImageUrl = await uploadImageToCloudinary(file, "farmers");
				if (!profileImageUrl) return;
			}
			const payload = { ...data, profileImageUrl };
			await makePostRequest({
				data: payload,
				endpoint: "api/farmers",
				redirect: () => router.push("/dashboard/farmers"),
				resourceName: "Nông dân",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo nông dân mới" />

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
					<ImageInput
						className="col-span-2"
						disabled={loading}
						file={file}
						label="Ảnh đại diện"
						setFile={setFile}
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
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						falseTitle="Chờ xác minh"
						label="Trạng thái nông dân"
						name="isActive"
						register={register}
						trueTitle="Đang hoạt động"
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo nông dân"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
