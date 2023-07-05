"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { selectCurrentUserState } from "@/redux/features";
import { Input } from "../Input";
import { useUpdateUser } from "@/hooks";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";

export const Profile: React.FC = ({}) => {
	const { user } = useAppSelector(selectCurrentUserState);
	const { updateUser, isLoading: isUpdating } = useUpdateUser();

	const [inputName, setInputName] = useState("...");

	const updateUserHandler = async () => {
		if (inputName.length) await updateUser(inputName);
	};

	useEffect(() => {
		if (user) setInputName(user.username);
	}, [user]);

	if (!user) return <>loading...</>;

	return (
		<div>
			<h1 className="text-white text-3xl 2xl:text-5xl">Profile</h1>
			<div className="py-5 2xl:py-10">
				<div className="mb-4">
					<h3 className="text-gray-400 text-sm 2xl:text-base mb-2">
						USERNAME
					</h3>
					<Input
						value={inputName}
						onChange={(e) => setInputName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<h3 className="text-gray-400 text-sm 2xl:text-base mb-2">
						EMAIL
					</h3>
					<h4 className="text-gray-400">{user.email}</h4>
				</div>
				<div className="mb-6">
					<h3 className="text-gray-400 text-sm 2xl:text-base mb-2">
						MY POSTS
					</h3>
					<Link href={"/post/me"}>
						<h4 className="text-sky-500 hover:underline text-sm">
							click here to see your posts.
						</h4>
					</Link>
				</div>
				<div className="mt-10">
					<Button
						size="xl"
						color="blue-gradient"
						className="text-white w-full"
						disabled={inputName === user.username}
						buttonType="default"
						onClick={updateUserHandler}
					>
						{isUpdating ? (
							<div className="w-full h-full flex items-center justify-center">
								<ColorRing
									colors={[
										"white",
										"white",
										"white",
										"white",
										"white",
									]}
									width={36}
								/>
							</div>
						) : (
							"save"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};
