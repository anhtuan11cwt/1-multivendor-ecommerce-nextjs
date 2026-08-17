import { NextResponse } from "next/server";

import { staffSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = staffSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { fullName, password, email, phone } = parsed.data;
		const newStaff = {
			createdAt: new Date().toLocaleDateString("vi-VN"),
			email,
			fullName,
			id: crypto.randomUUID(),
			password,
			phone: phone || "",
		};
		console.log("Đã tạo nhân viên:", newStaff);
		return NextResponse.json({ data: newStaff }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo nhân viên" },
			{ status: 500 },
		);
	}
}
