import { IsNotEmpty, IsString } from "class-validator";

export class GetToken {
	@IsNotEmpty()
	@IsString()
	token: string;
}
