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
		const { imageUrl, description, url } = parsed.data;
		const newBanner = {
			createdAt: new Date().toLocaleDateString("vi-VN"),
			description: description || "",
			id: crypto.randomUUID(),
			imageUrl,
			url: url || "",
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
