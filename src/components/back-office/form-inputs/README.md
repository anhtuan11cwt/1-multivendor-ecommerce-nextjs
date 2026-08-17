# Form Inputs — Các thành phần biểu mẫu tái sử dụng

Thư mục chứa các component dùng chung cho toàn bộ form ở back-office.

## Danh sách component

| Component | Mô tả |
|-----------|-------|
| `FormHeader` | Header form: tiêu đề + nút đóng (X), `router.back()` |
| `TextInput` | Input văn bản/số/ngày (có label, error, focus ring slate) |
| `TextAreaInput` | Textarea (có label, error) |
| `SelectInput` | Select đơn / chọn nhiều (`multiple`), options `{ id, title }` |
| `ImageInput` | Chọn ảnh → preview local (blob), upload lên Cloudinary khi submit |
| `ToggleInput` | Toggle trạng thái (isActive), hiển thị text realtime theo `useWatch` |
| `ArrayItemsInput` | Nhập/xóa mảng phần tử (tags, features...), tái sử dụng cho nhiều loại |
| `SubmitButton` | Nút submit kèm trạng thái loading |

---

## ArrayItemsInput

Dùng khi cần nhập một danh sách các chuỗi (tag, tính năng...).

**Props:** `items`, `setItems`, `itemTitle = "Tag"`, `disabled = false`, `maxLength = 20`.

**Cách dùng** — khai báo state mảng ở component cha rồi truyền vào:

```jsx
"use client";
import { useState } from "react";
import ArrayItemsInput from "@/components/back-office/form-inputs/array-items-input";

export default function ProductForm() {
	const [tags, setTags] = useState([]); // mảng ban đầu có thể là ["Rau sạch"]
	// ...
	return (
		<ArrayItemsInput
			items={tags}
			setItems={setTags}
			itemTitle="Tag"
			disabled={isSubmitting}
		/>
	);
}
```

Khi submit, gộp `tags` vào payload:

```js
const payload = { ...data, tags };
```

> **Lưu ý:** `ArrayItemsInput` quản lý state nội bộ (showForm, item nhập). Component cha chỉ chịu trách nhiệm `items` và `setItems`. Item rỗng không được thêm; mỗi item tối đa `maxLength` ký tự.

---

## ToggleInput

Dùng cho trường trạng thái boolean (ví dụ `isActive`).

**Props:** `label`, `name`, `register`, `control`, `trueTitle = "Active"`, `falseTitle = "Draft"`, `disabled = false`, `className`.

**Cách dùng** — cần `control` từ `useForm`; đặt `defaultValues.isActive` để khởi tạo:

```jsx
"use client";
import { useForm } from "react-hook-form";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";

export default function CategoryForm() {
	const { register, control, handleSubmit } = useForm({
		defaultValues: { isActive: true },
	});
	// ...
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ToggleInput
				control={control}
				label="Xuất bản danh mục"
				name="isActive"
				register={register}
				trueTitle="Đang hoạt động"
				falseTitle="Bản nháp"
			/>
		</form>
	);
}
```

**Hành vi:**
- Giá trị gửi đi là boolean (`true`/`false`) trong `data`.
- Text cạnh toggle cập nhật realtime theo `useWatch` — thường dùng `trueTitle`/`falseTitle` để thể hiện trạng thái.
- Khuyến nghị `defaultValues`: `isActive: true` cho hầu hết entity; farmer `false` (chờ xác minh).

> Lưu ý: schema (Zod) của entity nên khai báo `isActive: z.boolean().default(true)` (hoặc `false` với farmer) để đồng bộ frontend lẫn backend.
