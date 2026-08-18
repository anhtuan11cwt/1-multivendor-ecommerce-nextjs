import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(_request, { params }) {
	try {
		const { slug } = await params;
		const product = await db.product.findUnique({
			include: { category: true },
			where: { slug },
		});
		if (!product) {
			return NextResponse.json(
				{ message: "Không tìm thấy sản phẩm" },
				{ status: 404 },
			);
		}
		return NextResponse.json({ data: product }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy chi tiết sản phẩm" },
			{ status: 500 },
		);
	}
}
