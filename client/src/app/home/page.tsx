"use client";

import { PostBoard, PostContent } from "@/components";
import { Navbar } from "@/components/Navbar";
import { useGetRandomPostQuery } from "@/redux/api/postApi";

export default function Page() {
	const {
		isFetching,
		isLoading,
		data: post,
		refetch,
	} = useGetRandomPostQuery(null);

	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<div className="w-full flex-grow flex justify-center items-center">
				<PostBoard refetch={refetch}>
					<PostContent
						isLoading={isFetching || isLoading ? true : false}
						post={post}
					/>
				</PostBoard>
			</div>
		</div>
	);
}
