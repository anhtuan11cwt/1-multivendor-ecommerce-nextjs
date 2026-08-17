import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { trainingSchema } from "@/lib/schemas";

export async function GET() {
	try {
		const trainings = await db.training.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: trainings }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh sách bài đào tạo" },
			{ status: 500 },
		);
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = trainingSchema.safeParse(body);
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
			title,
			slug,
			description,
			imageUrl,
			content,
			categoryId,
			isActive,
		} = parsed.data;
		const newTraining = await db.training.create({
			data: {
				categoryId,
				content: content || "",
				description: description || "",
				imageUrl: imageUrl || "",
				isActive,
				slug,
				title,
			},
		});
		console.log("Đã tạo bài đào tạo:", newTraining);
		return NextResponse.json({ data: newTraining }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo bài đào tạo" },
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
		const parsed = trainingSchema.safeParse(body);
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
			title,
			slug,
			description,
			imageUrl,
			content,
			categoryId,
			isActive,
		} = parsed.data;
		const updatedTraining = await db.training.update({
			data: {
				categoryId,
				content: content || "",
				description: description || "",
				imageUrl: imageUrl || "",
				isActive,
				slug,
				title,
			},
			where: { id },
		});
		console.log("Đã cập nhật bài đào tạo:", updatedTraining);
		return NextResponse.json({ data: updatedTraining }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật bài đào tạo" },
			{ status: 500 },
		);
	}
}
