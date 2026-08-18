import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(_request, { params }) {
	try {
		const { id } = await params;
		const category = await db.category.findUnique({
			include: { products: true },
			where: { id },
		});
		if (!category) {
			return NextResponse.json(
				{ message: "Không tìm thấy danh mục" },
				{ status: 404 },
			);
		}
		return NextResponse.json({ data: category }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh mục" },
			{ status: 500 },
		);
	}
}
