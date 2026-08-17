import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { marketSchema } from "@/lib/schemas";

export async function GET() {
	try {
		const markets = await db.market.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: markets }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh sách chợ" },
			{ status: 500 },
		);
	}
}

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
		const { title, slug, logo, description, isActive, categoryIds } =
			parsed.data;
		const existing = await db.market.findUnique({ where: { slug } });
		if (existing) {
			return NextResponse.json({ message: "Chợ đã tồn tại" }, { status: 409 });
		}
		const newMarket = await db.market.create({
			data: {
				categoryIds: categoryIds || [],
				description: description || "",
				isActive,
				logo: logo || "",
				slug,
				title,
			},
		});
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
		const { title, slug, logo, description, isActive, categoryIds } =
			parsed.data;
		const updatedMarket = await db.market.update({
			data: {
				categoryIds: categoryIds || [],
				description: description || "",
				isActive,
				logo: logo || "",
				slug,
				title,
			},
			where: { id },
		});
		console.log("Đã cập nhật chợ:", updatedMarket);
		return NextResponse.json({ data: updatedMarket }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật chợ" },
			{ status: 500 },
		);
	}
}
