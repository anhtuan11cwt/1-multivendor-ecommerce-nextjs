import { NextResponse } from "next/server";

import { generateUserCode } from "@/lib/generate-user-code";
import { farmerSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = farmerSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const {
			name,
			phone,
			email,
			physicalAddress,
			contactPerson,
			contactPersonPhone,
			paymentTerms,
			notes,
		} = parsed.data;
		const code = generateUserCode("LFF", name);
		const newFarmer = {
			code,
			contactPerson: contactPerson || "",
			contactPersonPhone: contactPersonPhone || "",
			createdAt: new Date().toLocaleDateString("vi-VN"),
			email,
			id: crypto.randomUUID(),
			name,
			notes: notes || "",
			paymentTerms: paymentTerms || "",
			phone,
			physicalAddress: physicalAddress || "",
		};
		console.log("Đã tạo nông dân:", newFarmer);
		return NextResponse.json({ data: newFarmer }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo nông dân" },
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
		const parsed = farmerSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const {
			name,
			phone,
			email,
			physicalAddress,
			contactPerson,
			contactPersonPhone,
			paymentTerms,
			notes,
		} = parsed.data;
		const code = body.code || generateUserCode("LFF", name);
		const updatedFarmer = {
			code,
			contactPerson: contactPerson || "",
			contactPersonPhone: contactPersonPhone || "",
			email,
			id,
			name,
			notes: notes || "",
			paymentTerms: paymentTerms || "",
			phone,
			physicalAddress: physicalAddress || "",
		};
		console.log("Đã cập nhật nông dân:", updatedFarmer);
		return NextResponse.json({ data: updatedFarmer }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật nông dân" },
			{ status: 500 },
		);
	}
}
