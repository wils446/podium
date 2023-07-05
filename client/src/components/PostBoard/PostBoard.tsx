"use client";

import { GetRandomPostRefetch } from "@/redux/api/postApi";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

type PostBoardProps = {
	refetch: GetRandomPostRefetch;
	children: React.ReactNode;
};

export const PostBoard: React.FC<PostBoardProps> = ({ children, refetch }) => {
	const router = useRouter();

	return (
		<div className="h-full sm:h-5/6 w-full">
			<div className="h-full max-h-full sm:max-h-fit flex w-full sm:justify-center items-center flex-col sm:space-y-7 2xl:space-y-10">
				<div className="h-full sm:h-auto sm:w-5/6 lg:w-3/5 2xl:w-5/12 rounded-xl  bg-black py-8 px-6  sm:px-10 drop-shadow-3xl w-full">
					{children}
				</div>

				{/* for mobile */}
				<div className="flex sm:hidden">
					<Button
						size={"3xl"}
						buttonType="default"
						color="dark"
						className="text-sky-500"
						onClick={refetch}
					>
						Next Post {">>"}
					</Button>
				</div>

				{/* for pc or laptop */}
				<div className="hidden sm:flex">
					<div className="flex space-x-5">
						<Button
							size={"3xl"}
							buttonType="default"
							color="dark"
							className="text-sky-500"
							onClick={() => router.push("/post/new")}
						>
							Create Post
						</Button>
						<Button
							size={"3xl"}
							buttonType="default"
							color="dark"
							className="text-sky-500"
							onClick={refetch}
						>
							Next Post {">>"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
