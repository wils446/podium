import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsBoolean()
	isAnonymous: boolean;
}
