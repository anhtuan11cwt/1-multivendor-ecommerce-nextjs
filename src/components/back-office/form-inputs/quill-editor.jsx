"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ align: [] }],
		["link", "image", "blockquote", "code-block"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"list",
	"align",
	"link",
	"image",
	"blockquote",
	"code-block",
];

export default function QuillEditor({
	label,
	value = "",
	onChange,
	disabled = false,
}) {
	return (
		<div>
			<span className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300">
				{label}
			</span>
			<div
				className={`transition ${disabled ? "pointer-events-none opacity-50" : ""}`}
			>
				<ReactQuill
					formats={formats}
					modules={modules}
					onChange={onChange}
					readOnly={disabled}
					theme="snow"
					value={value}
				/>
			</div>
		</div>
	);
}
