import { useCreatePostMutation } from "@/redux/api/postApi";
import { ICreatePostDto } from "@/redux/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCreatePost = () => {
	const router = useRouter();
	const [createPostMutation, { isLoading, isSuccess }] =
		useCreatePostMutation();

	const createPost = async (data: ICreatePostDto) => {
		await createPostMutation(data);
	};

	useEffect(() => {
		if (isSuccess) router.push("/home");
	}, [isSuccess]);

	return { createPost, isLoading };
};
