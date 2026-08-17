import Footer from "@/components/front-end/footer";
import Navbar from "@/components/front-end/navbar";

export default function FrontEndLayout({ children }) {
	return (
		<div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-950">
			<Navbar />
			<div className="flex-1">{children}</div>
			<Footer />
		</div>
	);
}
