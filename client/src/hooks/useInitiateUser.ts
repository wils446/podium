import { userApi } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

export const useInitiateUser = () => {
	const dispatch = useAppDispatch();
	const path = usePathname();
	const router = useRouter();

	const initiateUser = () => {
		console.log("function called");
		const user = dispatch(userApi.endpoints.getMe.initiate(null));
		user.unwrap()
			.then(() => {
				if (path === "/") router.push("/home");
			})
			.catch((errStatus) => {
				if (errStatus === 401) {
					if (path == "/") return;
					router.replace("/");
				}
			});

		return user;
	};

	return { initiateUser };
};
