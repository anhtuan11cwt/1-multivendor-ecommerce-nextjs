import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(_request, { params }) {
	try {
		const { id } = await params;
		const user = await db.user.findUnique({ where: { id } });
		if (!user) {
			return NextResponse.json(
				{ message: "Không tìm thấy người dùng" },
				{ status: 404 },
			);
		}
		return NextResponse.json({ data: user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy thông tin người dùng" },
			{ status: 500 },
		);
	}
}
