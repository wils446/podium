"use client";

import { useToggleLikeMutation } from "@/redux/api/postApi";
import { IPostResponse } from "@/redux/interfaces/IPostResponse";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type PostContetProps = {
	isLoading: boolean;
	post: IPostResponse | undefined;
};

export const PostContent: React.FC<PostContetProps> = ({ isLoading, post }) => {
	const [toggleLike] = useToggleLikeMutation();
	const [isLike, setIsLike] = useState<boolean>();

	useEffect(() => {
		if (post) setIsLike(post.isLike);
	}, [post]);

	if (isLoading || !post) return <div>loading state...</div>;

	return (
		<>
			{post && (
				<div className="flex flex-col items-center text-white justify-between lg:space-y-3 2xl:space-y-10 h-full w-full">
					{/* for pc / tab */}
					<div className="text-center lg:text-xl 2xl:text-3xl hidden sm:flex">
						{post.title}
					</div>
					<div className="py-2 hidden sm:flex">
						<div className="text-justify text-sm lg:max-h-56 xl:max-h-48 2xl:text-base 2xl:max-h-96 overflow-y-auto px-2">
							{post.content}
						</div>
					</div>

					{/* for mobile */}
					<div className="flex flex-col space-y-5 sm:hidden">
						<div className="text-center text-2xl">{post.title}</div>
						<div className="py-2 ">
							<div className="text-justify text-sm">
								{post.content}
							</div>
						</div>
					</div>

					{/* for pc / tab */}
					<div className="hidden justify-between w-full items-center px-10 sm:flex lg:text-sm 2xl:text-xl">
						<h1 className="">
							{post.isAnonymous
								? "Anonymous"
								: post.user.username}
						</h1>
						<h1 className="">
							{new Date(post.createdAt).toDateString()}
						</h1>
						<button
							className="hover:opacity-80"
							onClick={async () => {
								await toggleLike({ postId: post.id });
								setIsLike((prev) => !prev);
							}}
						>
							{isLike ? (
								<AiFillHeart color="red" size={32} />
							) : (
								<AiOutlineHeart color="red" size={32} />
							)}
						</button>
					</div>

					{/* for mobile */}
					<div className="flex justify-between w-full items-center  visible sm:hidden">
						<div>
							<h1 className="">
								{post.isAnonymous
									? "Anonymous"
									: post.user.username}
							</h1>
							<h1 className="">
								{new Date(post.createdAt).toDateString()}
							</h1>
						</div>
						<button
							className="hover:opacity-80"
							onClick={async () => {
								await toggleLike({ postId: post.id });
								setIsLike((prev) => !prev);
							}}
						>
							{isLike ? (
								<AiFillHeart color="red" size={42} />
							) : (
								<AiOutlineHeart color="red" size={42} />
							)}
						</button>
					</div>
				</div>
			)}
		</>
	);
};
