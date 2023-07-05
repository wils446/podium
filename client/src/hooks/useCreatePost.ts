import { useCreatePostMutation } from "@/redux/api/postApi";
import { ICreatePostDto } from "@/redux/interfaces";
import { useRouter } from "next/navigation";

export const useCreatePost = () => {
	const router = useRouter();
	const [createPostMutation, { isLoading, isSuccess }] =
		useCreatePostMutation();

	const createPost = async (data: ICreatePostDto) => {
		const result = await createPostMutation(data);

		if (isSuccess) router.push("/home");
	};

	return { createPost, isLoading };
};
