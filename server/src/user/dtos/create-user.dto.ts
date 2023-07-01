import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	googleId: string;
}
