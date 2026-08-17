import { NextResponse } from "next/server";

import { bannerSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = bannerSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, link, imageUrl, isActive } = parsed.data;
		const newBanner = {
			createdAt: new Date().toLocaleDateString("vi-VN"),
			id: crypto.randomUUID(),
			imageUrl,
			isActive,
			link: link || "",
			title,
		};
		console.log("Đã tạo banner:", newBanner);
		return NextResponse.json({ data: newBanner }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo banner" },
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
		const parsed = bannerSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, link, imageUrl, isActive } = parsed.data;
		const updatedBanner = {
			id,
			imageUrl,
			isActive,
			link: link || "",
			title,
		};
		console.log("Đã cập nhật banner:", updatedBanner);
		return NextResponse.json({ data: updatedBanner }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật banner" },
			{ status: 500 },
		);
	}
}
