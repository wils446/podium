"use client";

import { useGetMyPostsQuery } from "@/redux/api/postApi";
import { ColorRing } from "react-loader-spinner";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { AiFillHeart } from "react-icons/ai";

export const UserPosts: React.FC = () => {
	const {
		isLoading,
		isFetching,
		data: posts,
		refetch,
	} = useGetMyPostsQuery(null);
	const { deletePost, isLoading: isDeleting } = useDeletePost();

	const [deletePostId, setDeletePostId] = useState("");
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	if (isLoading || isFetching)
		return (
			<div className="h-full w-full flex items-center justify-center">
				<ColorRing
					colors={["white", "white", "white", "white", "white"]}
				/>
			</div>
		);

	return (
		<div className="flex flex-col space-y-5">
			<h1 className="text-2xl 2xl:text-3xl text-white">Posts</h1>
			{posts && (
				<>
					{posts.length === 0 ? (
						<div>
							<h1 className="text-white">
								Looks like you have never created a post.{" "}
								<Link
									href={"/post/new"}
									className="text-sky-500"
								>
									Let's create a post here.
								</Link>
							</h1>
						</div>
					) : (
						<div className="flex flex-col space-y-2">
							{posts.map(({ id, title, createdAt, like }) => (
								<SimpleUserPostList
									key={id}
									title={title}
									createdAt={createdAt}
									deleteButtonOnclick={() => {
										setDeletePostId(id);
										setDeleteModalOpen(true);
									}}
									likeCount={like.length}
								/>
							))}
						</div>
					)}
				</>
			)}
			<Modal isOpen={isDeleteModalOpen}>
				{isDeleting ? (
					<div className="h-full w-full flex items-center justify-center">
						<ColorRing
							colors={[
								"white",
								"white",
								"white",
								"white",
								"white",
							]}
						/>
					</div>
				) : (
					<div className="flex flex-col space-y-5">
						<h1>are you sure want to delete this post?</h1>
						<div className="w-full flex space-x-2">
							<Button
								buttonType="default"
								color="red"
								size="modal"
								onClick={async () => {
									await deletePost(deletePostId);
									await setDeleteModalOpen(false);
									await refetch();
								}}
							>
								delete
							</Button>
							<Button
								buttonType="default"
								size="modal"
								color="dark"
								onClick={() => {
									setDeletePostId("");
									setDeleteModalOpen(false);
								}}
							>
								cancel
							</Button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

type SimpleUserPostListProps = {
	title: string;
	createdAt: string;
	likeCount: number;
	deleteButtonOnclick: () => void;
};

export const SimpleUserPostList: React.FC<SimpleUserPostListProps> = ({
	title,
	createdAt,
	deleteButtonOnclick,
	likeCount,
}) => {
	return (
		<div className="w-full bg-darkGrey text-gray-300 text-sm py-2 px-2 flex flex-col space-y-2 rounded-lg hover:bg-opacity-75">
			<h1>{title}</h1>
			<div className="flex justify-between">
				<div className="flex items-center space-x-2">
					<h1 className="text-xs">
						{new Date(createdAt).toDateString()}
					</h1>
					<div className="flex items-center">
						<AiFillHeart color="red" size={16} />
						<h1 className="text-red-500">{likeCount}</h1>
					</div>
				</div>
				<button onClick={deleteButtonOnclick}>
					<BsFillTrashFill className="text-red-500" />
				</button>
			</div>
		</div>
	);
};
