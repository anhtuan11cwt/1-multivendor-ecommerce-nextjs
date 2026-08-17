import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUserCode } from "@/lib/generate-user-code";
import { generateISOFormattedDate } from "@/lib/iso-formatted-date";
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
		const { fullName, password, email, phone, cccd, dateOfBirth } = parsed.data;
		const code = generateUserCode("LSM", fullName);
		const newStaff = await db.staff.create({
			data: {
				cccd: cccd || "",
				code,
				dateOfBirth: dateOfBirth
					? new Date(generateISOFormattedDate(dateOfBirth))
					: null,
				email,
				fullName,
				password,
				phone: phone || "",
			},
		});
		console.log("Đã tạo nhân viên:", newStaff);
		return NextResponse.json({ data: newStaff }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo nhân viên" },
			{ status: 500 },
		);
	}
}
