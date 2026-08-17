"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
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
import { makePutRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { trainingFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const categoryOptions = [
	{ id: "1", title: "Rau củ hữu cơ" },
	{ id: "2", title: "Trái cây nhiệt đới" },
];

const mockData = {
	1: {
		categoryId: "1",
		content: "<p>Hướng dẫn kỹ thuật trồng rau thủy canh tại nhà.</p>",
		description: "Kỹ thuật trồng rau thủy canh cơ bản cho hộ gia đình",
		isActive: true,
		title: "Kỹ thuật trồng rau thủy canh",
	},
};

export default function UpdateTrainingPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const training = mockData[id] || {
		categoryId: "",
		content: "",
		description: "",
		isActive: true,
		title: "",
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			categoryId: training.categoryId,
			description: training.description,
			isActive: training.isActive,
			title: training.title,
		},
		resolver: zodResolver(trainingFormSchema),
	});
	const [file, setFile] = useState(null);
	const [content, setContent] = useState(training.content);
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
			const payload = { id, ...data, content, imageUrl, slug };
			await makePutRequest({
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
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa bài đào tạo - ${training.title}`}
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
