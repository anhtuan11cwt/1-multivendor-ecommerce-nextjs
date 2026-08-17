"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import QuillEditor from "@/components/back-office/form-inputs/quill-editor";
import SelectInput from "@/components/back-office/form-inputs/select-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { trainingFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const categoryOptions = [
	{ id: "1", title: "Rau củ hữu cơ" },
	{ id: "2", title: "Trái cây nhiệt đới" },
];

export default function NewTrainingPage() {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: true },
		resolver: zodResolver(trainingFormSchema),
	});
	const [file, setFile] = useState(null);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let imageUrl = "";
			if (file) {
				imageUrl = await uploadImageToCloudinary(file, "trainings");
				if (!imageUrl) return;
			}
			const slug = generateSlug(data.title);
			const payload = { ...data, content, imageUrl, slug };
			await makePostRequest({
				data: payload,
				endpoint: "api/trainings",
				redirect: () => router.push("/dashboard/community"),
				resourceName: "Bài đào tạo",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-4xl">
			<FormHeader isLoading={loading} title="Tạo bài đào tạo mới" />

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
						label="Tiêu đề bài đào tạo"
						name="title"
						register={register}
					/>
					<SelectInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Chọn danh mục"
						name="categoryId"
						options={categoryOptions}
						placeholder="Chọn danh mục..."
						register={register}
					/>
					<ImageInput
						disabled={loading}
						file={file}
						label="Ảnh đại diện"
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
					<div className="col-span-2">
						<QuillEditor
							disabled={loading}
							label="Nội dung đào tạo"
							onChange={setContent}
							value={content}
						/>
					</div>
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						label="Xuất bản bài đào tạo"
						name="isActive"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo bài đào tạo"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
