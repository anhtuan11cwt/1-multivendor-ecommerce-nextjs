import { NextResponse } from "next/server";

import { marketSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = marketSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, slug, logo, description } = parsed.data;
		const newMarket = {
			createdAt: new Date().toLocaleDateString("vi-VN"),
			description: description || "",
			id: crypto.randomUUID(),
			logo: logo || "",
			slug,
			title,
		};
		console.log("Đã tạo chợ:", newMarket);
		return NextResponse.json({ data: newMarket }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo chợ" },
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
		const parsed = marketSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, slug, logo, description } = parsed.data;
		const updatedMarket = {
			description: description || "",
			id,
			logo: logo || "",
			slug,
			title,
		};
		console.log("Đã cập nhật chợ:", updatedMarket);
		return NextResponse.json({ data: updatedMarket }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật chợ" },
			{ status: 500 },
		);
	}
}
