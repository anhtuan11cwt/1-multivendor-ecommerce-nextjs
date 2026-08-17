import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { loginSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = loginSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { email, password } = parsed.data;

		const user = await db.user.findUnique({ where: { email } });
		if (!user) {
			return NextResponse.json(
				{ message: "Email hoặc mật khẩu không đúng" },
				{ status: 401 },
			);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return NextResponse.json(
				{ message: "Email hoặc mật khẩu không đúng" },
				{ status: 401 },
			);
		}

		return NextResponse.json(
			{
				data: {
					email: user.email,
					id: user.id,
					name: user.name,
					role: user.role,
				},
				message: "Đăng nhập thành công",
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi đăng nhập" },
			{ status: 500 },
		);
	}
}
