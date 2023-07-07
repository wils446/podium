import { useCreatePost } from "@/hooks";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { Button } from "../Button";
import { Input, TextArea } from "../Input";

type InputForm = {
	title: string;
	content: string;
	isAnonymous: boolean;
};

export const CreatePostForm: React.FC = ({}) => {
	const router = useRouter();

	const { createPost, isLoading } = useCreatePost();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputForm>({ defaultValues: { isAnonymous: false } });
	const onSubmit: SubmitHandler<InputForm> = ({
		content,
		isAnonymous,
		title,
	}) => {
		createPost({ content, isAnonymous, title });
	};

	return (
		<form
			className="flex flex-col space-y-10 justify-between h-full sm:h-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col flex-grow space-y-1 sm:space-y-2">
				<div className="flex flex-col space-y-1">
					<label className="text-white flex justify-between">
						Title :{" "}
						{errors.title && (
							<span className="text-red-600">
								{errors.title.type === "maxLength"
									? "max length 80 characters!"
									: "title required"}
							</span>
						)}
					</label>
					<Input
						type="text"
						inputWidth={"full"}
						mobileWidth={"full"}
						{...register("title", {
							required: true,
							maxLength: 70,
						})}
						maxLength={70}
					/>
				</div>
				<div className="flex flex-col flex-grow max-h-[25rem]">
					<label className="text-white flex justify-between">
						Content :{" "}
						{errors.content && (
							<span className="text-red-600">
								content required!
							</span>
						)}
					</label>
					<TextArea
						inputWidth={"full"}
						mobileWidth={"full"}
						maxHeight={"max"}
						rows={5}
						{...register("content")}
					/>
				</div>
				<div className="flex space-x-2 items-center">
					<label className="text-white">anonymous</label>
					<Button
						buttonType="toggle-switch"
						formProps={register("isAnonymous")}
					/>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 sm:justify-center">
				<Button
					type="submit"
					buttonType="default"
					color="blue-gradient"
					size={"2xl"}
					textColor={"white"}
					onClick={() => {
						handleSubmit(onSubmit);
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="h-full w-full flex justify-center items-center">
							<ColorRing
								colors={[
									"white",
									"white",
									"white",
									"white",
									"white",
								]}
								width={48}
							/>
						</div>
					) : (
						"create"
					)}
				</Button>
				<Button
					buttonType="default"
					color="dark"
					size={"2xl"}
					textColor={"white"}
					onClick={() => router.push("/home")}
				>
					cancel
				</Button>
			</div>
		</form>
	);
};
