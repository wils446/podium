import { setToken } from "@/redux/features";
import { CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useInitiateUser } from "./useInitiateUser";
import { useAppDispatch } from "@/redux/hooks";

export const useGoogleLogin = () => {
	const router = useRouter();
	const { initiateUser } = useInitiateUser();
	const dispatch = useAppDispatch();

	const handleSuccess = async (credentialResponse: CredentialResponse) => {
		const callbackURL = process.env
			.NEXT_PUBLIC_GOOGLE_CALLBACK_URL as string;

		const response = await fetch(callbackURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: credentialResponse.credential,
			}),
		});

		const responseJson = await response.json();
		await dispatch(setToken({ token: responseJson.jwtToken }));
		await initiateUser();
		router.push("/home");
	};

	return { handleSuccess };
};
