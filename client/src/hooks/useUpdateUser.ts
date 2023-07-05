import { useUpdateMeMutation } from "@/redux/api/userApi";

export const useUpdateUser = () => {
	const [updateUserMutation, { isLoading, isError, error }] =
		useUpdateMeMutation();

	const updateUser = async (username: string) => {
		await updateUserMutation({ username });
	};

	return { updateUser, isLoading, isError, error };
};
