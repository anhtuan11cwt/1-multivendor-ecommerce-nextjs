import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = userSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { name, email, password, role } = parsed.data;

		const existing = await db.user.findUnique({ where: { email } });
		if (existing) {
			return NextResponse.json(
				{ message: "Người dùng đã tồn tại" },
				{ status: 409 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await db.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				role: role || "USER",
			},
		});
		console.log("Đã tạo người dùng:", newUser);
		return NextResponse.json(
			{ data: newUser, message: "Tạo người dùng thành công" },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo người dùng" },
			{ status: 500 },
		);
	}
}
