import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { categorySchema } from "@/lib/schemas";

export async function GET() {
	try {
		const categories = await db.category.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: categories }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh sách danh mục" },
			{ status: 500 },
		);
	}
}

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
		const { title, slug, imageUrl, description, isActive } = parsed.data;
		if (!slug) {
			return NextResponse.json(
				{ message: "Slug là bắt buộc" },
				{ status: 400 },
			);
		}
		const existing = await db.category.findUnique({ where: { slug } });
		if (existing) {
			return NextResponse.json(
				{ message: "Danh mục đã tồn tại" },
				{ status: 409 },
			);
		}
		const newCategory = await db.category.create({
			data: {
				description: description || "",
				imageUrl: imageUrl || "",
				isActive,
				marketIds: [],
				slug,
				title,
			},
		});
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
		const { title, slug, imageUrl, description, isActive } = parsed.data;
		const updatedCategory = await db.category.update({
			data: {
				description: description || "",
				imageUrl: imageUrl || "",
				isActive,
				slug,
				title,
			},
			where: { id },
		});
		console.log("Đã cập nhật danh mục:", updatedCategory);
		return NextResponse.json({ data: updatedCategory }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật danh mục" },
			{ status: 500 },
		);
	}
}
