"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ArrayItemsInput from "@/components/back-office/form-inputs/array-items-input";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { farmerSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";
import { restrictDigits } from "@/lib/utils";

export default function NewFarmerForm({ user }) {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: user.email || "",
			isActive: false,
			name: user.name || "",
		},
		resolver: zodResolver(farmerSchema),
	});
	const [file, setFile] = useState(null);
	const [crops, setCrops] = useState([]);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			let profileImageUrl = "";
			if (file) {
				profileImageUrl = await uploadImageToCloudinary(file, "farmers");
				if (!profileImageUrl) return;
			}
			const payload = {
				...data,
				crops,
				profileImageUrl,
				userId: user.id,
			};
			await makePostRequest({
				data: payload,
				endpoint: "api/farmers",
				redirect: () => router.push("/dashboard"),
				resourceName: "Nông dân",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
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
					name="name"
					register={register}
				/>
				<TextInput
					className="col-span-2"
					disabled={loading}
					errors={errors}
					isRequired
					label="Email"
					name="email"
					register={register}
					type="email"
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
					label="Người liên hệ"
					name="contactPerson"
					register={register}
				/>
				<TextInput
					disabled={loading}
					errors={errors}
					inputMode="numeric"
					label="SĐT người liên hệ"
					maxLength={10}
					name="contactPersonPhone"
					onBeforeInput={restrictDigits}
					register={register}
					type="tel"
				/>
				<TextInput
					disabled={loading}
					errors={errors}
					label="Địa chỉ"
					name="physicalAddress"
					register={register}
				/>
				<TextInput
					disabled={loading}
					errors={errors}
					label="Diện tích đất (ha)"
					min="0"
					name="landSize"
					register={register}
					type="number"
				/>
				<TextInput
					disabled={loading}
					errors={errors}
					label="Vụ mùa chính"
					name="mainCrop"
					register={register}
				/>
				<ImageInput
					className="col-span-2"
					disabled={loading}
					file={file}
					label="Ảnh đại diện"
					setFile={setFile}
				/>
				<div className="col-span-2">
					<ArrayItemsInput
						disabled={loading}
						items={crops}
						itemTitle="Sản phẩm"
						setItems={setCrops}
					/>
				</div>
				<TextAreaInput
					className="col-span-2"
					disabled={loading}
					errors={errors}
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
					buttonTitle="Hoàn tất hồ sơ"
					isLoading={loading}
					loadingButtonTitle="Đang lưu..."
				/>
			</div>
		</form>
	);
}
