import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUserCode } from "@/lib/generate-user-code";
import { farmerSchema } from "@/lib/schemas";

export async function GET() {
	try {
		const farmers = await db.farmer.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: farmers }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh sách nông dân" },
			{ status: 500 },
		);
	}
}

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
			isActive,
			profileImageUrl,
		} = parsed.data;
		const code = generateUserCode("LFF", name);
		const user = await db.user.upsert({
			create: { email, name, role: "FARMER" },
			update: { name },
			where: { email },
		});
		const newFarmer = await db.farmer.create({
			data: {
				code,
				contactPerson: contactPerson || "",
				contactPersonPhone: contactPersonPhone || "",
				email,
				isActive,
				name,
				notes: notes || "",
				paymentTerms: paymentTerms || "",
				phone,
				physicalAddress: physicalAddress || "",
				profileImageUrl: profileImageUrl || "",
				userId: user.id,
			},
		});
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
			isActive,
			profileImageUrl,
		} = parsed.data;
		const code = body.code || generateUserCode("LFF", name);
		const updatedFarmer = await db.farmer.update({
			data: {
				code,
				contactPerson: contactPerson || "",
				contactPersonPhone: contactPersonPhone || "",
				email,
				isActive,
				name,
				notes: notes || "",
				paymentTerms: paymentTerms || "",
				phone,
				physicalAddress: physicalAddress || "",
				profileImageUrl: profileImageUrl || "",
			},
			where: { id },
		});
		console.log("Đã cập nhật nông dân:", updatedFarmer);
		if (updatedFarmer.userId) {
			await db.user
				.update({
					data: { email, name },
					where: { id: updatedFarmer.userId },
				})
				.catch(() => {});
		}
		return NextResponse.json({ data: updatedFarmer }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật nông dân" },
			{ status: 500 },
		);
	}
}
