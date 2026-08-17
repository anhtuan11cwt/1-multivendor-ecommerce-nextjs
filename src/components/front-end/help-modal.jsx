"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { CornerDownLeft, Headphones, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";

const helpOptions = [
	{
		description: "Nhân viên hỗ trợ luôn sẵn sàng trực điện thoại",
		href: "/call",
		icon: Headphones,
		title: "Gọi điện hỗ trợ",
	},
	{
		description: "Theo dõi trạng thái giao hàng của đơn hàng",
		href: "/track",
		icon: Truck,
		title: "Theo dõi đơn hàng",
	},
	{
		description: "Hướng dẫn trả hàng và hoàn tiền nhanh chóng",
		href: "/returns",
		icon: CornerDownLeft,
		title: "Trả hàng & hoàn tiền",
	},
	{
		description: "Trò chuyện trực tiếp với đội ngũ chăm sóc khách hàng",
		href: "/chat",
		icon: MessageSquare,
		title: "Chat trực tuyến",
	},
];

export default function HelpModal({ onClose, show }) {
	return (
		<Modal dismissible onClose={onClose} show={show} size="lg">
			<ModalHeader>Cần giúp đỡ?</ModalHeader>
			<ModalBody>
				<p className="mb-5 text-slate-600 text-sm dark:text-slate-400">
					Liên hệ với bộ phận hỗ trợ của chúng tôi để được giải đáp nhanh nhất.
				</p>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{helpOptions.map(({ description, href, icon: Icon, title }) => (
						<Link
							className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-600"
							href={href}
							key={href}
							onClick={onClose}
						>
							<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800 dark:bg-lime-500/20 dark:text-lime-400">
								<Icon className="size-5" />
							</div>
							<div>
								<p className="font-medium text-slate-900 text-sm dark:text-slate-100">
									{title}
								</p>
								<p className="mt-1 text-slate-500 text-xs leading-relaxed dark:text-slate-400">
									{description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</ModalBody>
		</Modal>
	);
}
