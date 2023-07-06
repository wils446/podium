"use client";

import { useInitiateUser } from "@/hooks/useInitiateUser";
import { selectCurrentUserState } from "@/redux/features";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

export const RequireUser: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const path = usePathname();
	const { isLoading } = useAppSelector(selectCurrentUserState);
	const { initiateUser } = useInitiateUser();

	useEffect(() => {
		const user = initiateUser();

		return user.unsubscribe;
	}, []);

	if (isLoading && path != "/")
		return (
			<div className="h-screen w-screen flex justify-center items-center">
				<ColorRing
					colors={["white", "white", "white", "white", "white"]}
				/>
			</div>
		);

	return <>{children}</>;
};
