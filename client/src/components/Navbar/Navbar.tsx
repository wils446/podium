"use client";

import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { BsFillPersonFill, BsPlusCircle } from "react-icons/bs";

export const Navbar: React.FC = () => {
	const { user } = useAppSelector((state) => state.userReducer);
	const path = usePathname();
	const router = useRouter();

	return (
		<div className="bg-navbar h-14 lg:h-12 2xl:h-16 max-h-16 flex-none flex items-center justify-between px-5 sm:px-12 drop-shadow-lg sticky top-0 z-50 sm:relative">
			<div className="text-navbar hover:cursor-default ">
				<div className="hidden sm:flex select-none text-base lg:text-sm 2xl:text-base">
					{!user ? "..." : user && user.username}
				</div>
				<div
					className="flex sm:hidden"
					onClick={() => router.push("/post/new")}
				>
					<BsPlusCircle color="white" size={24} />
				</div>
			</div>
			<h1
				className="text-3xl lg:text-2xl 2xl:text-4xl text-sky-500 font-semibold tracking-wide hover:cursor-pointer"
				onClick={() => {
					if (path != "/home") router.push("/home");
				}}
			>
				Podium
			</h1>
			<h1
				className="text-white hover:cursor-pointer "
				onClick={() => router.push("/profile/me")}
			>
				<div className="hidden sm:flex text-base lg:text-sm 2xl:text-base">
					{!user ? "..." : user && user.username}
				</div>
				<div className="flex sm:hidden">
					<button onClick={() => router.push("/profile/me")}>
						<BsFillPersonFill size={24} />
					</button>
				</div>
			</h1>
		</div>
	);
};
