import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateISOFormattedDate } from "@/lib/iso-formatted-date";
import { couponSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = couponSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const { title, couponCode, expiryDate, isActive } = parsed.data;
		const newCoupon = await db.coupon.create({
			data: {
				couponCode,
				expiryDate: new Date(generateISOFormattedDate(expiryDate)),
				isActive,
				title,
			},
		});
		console.log("Đã tạo mã giảm giá:", newCoupon);
		return NextResponse.json({ data: newCoupon }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo mã giảm giá" },
			{ status: 500 },
		);
	}
}
