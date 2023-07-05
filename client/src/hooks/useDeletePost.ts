import { useDeletePostByIdMutation } from "@/redux/api/postApi";

export const useDeletePost = () => {
	const [deletePostMutation, { isLoading, isError, error }] =
		useDeletePostByIdMutation();

	const deletePost = async (id: string) => {
		await deletePostMutation({ id });
	};

	return { deletePost, isLoading, isError, error };
};
