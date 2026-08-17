"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePutRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { marketFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const mockData = {
	1: {
		description: "Chợ đầu mối rau củ tại Long An",
		isActive: true,
		slug: "sprouts-farmers-market",
		title: "Sprouts Farmers Market",
	},
};

export default function UpdateMarketPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const market = mockData[id] || {
		description: "",
		isActive: true,
		slug: "",
		title: "",
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			description: market.description,
			isActive: market.isActive,
			title: market.title,
		},
		resolver: zodResolver(marketFormSchema),
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let logo = "";
			if (file) {
				logo = await uploadImageToCloudinary(file, "markets");
				if (!logo) return;
			}
			const slug = generateSlug(data.title);
			const payload = { id, ...data, logo, slug };
			const result = await makePutRequest({
				data: payload,
				endpoint: "api/markets",
				resourceName: "Chợ",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/markets");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa chợ - ${market.title}`}
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
						label="Tên chợ"
						name="title"
						register={register}
					/>
					<ImageInput
						className="col-span-2"
						disabled={loading}
						file={file}
						label="Logo chợ"
						setFile={setFile}
					/>
					<TextAreaInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Mô tả"
						name="description"
						register={register}
					/>
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						label="Trạng thái chợ"
						name="isActive"
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
