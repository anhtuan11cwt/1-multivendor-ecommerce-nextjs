import { NextResponse } from "next/server";

import { categorySchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = categorySchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, slug, imageUrl, description, marketIds } = parsed.data;
		if (!slug) {
			return NextResponse.json(
				{ message: "Slug là bắt buộc" },
				{ status: 400 },
			);
		}
		const newCategory = {
			createdAt: new Date().toLocaleDateString("vi-VN"),
			description: description || "",
			id: crypto.randomUUID(),
			imageUrl: imageUrl || "",
			marketIds: marketIds || [],
			slug,
			title,
		};
		console.log("Đã tạo danh mục:", newCategory);
		return NextResponse.json({ data: newCategory }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo danh mục" },
			{ status: 500 },
		);
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();
		const { id } = body;
		if (!id) {
			return NextResponse.json({ message: "ID là bắt buộc" }, { status: 400 });
		}
		const parsed = categorySchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, slug, imageUrl, description, marketIds } = parsed.data;
		const updatedCategory = {
			description: description || "",
			id,
			imageUrl: imageUrl || "",
			marketIds: marketIds || [],
			slug,
			title,
		};
		console.log("Đã cập nhật danh mục:", updatedCategory);
		return NextResponse.json({ data: updatedCategory }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật danh mục" },
			{ status: 500 },
		);
	}
}
