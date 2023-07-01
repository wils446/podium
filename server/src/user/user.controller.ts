import { Controller, Get, UseGuards, Put, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUser } from "src/auth/decorator/getUser.decorator";
import { User } from "./entity/user.entity";
import { JwtGuard } from "src/guard";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("users")
@UseGuards(JwtGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	// @Get()
	// async getUsers() {
	// 	return await this.userService.getAllUsers();
	// }

	@Get()
	async getUser(@GetUser() user: User) {
		return user;
	}

	@Put()
	async updateUser(
		@GetUser() user: User,
		@Body() bodyPayload: UpdateUserDto
	) {
		return await this.userService.updateUser(bodyPayload, user);
	}
}
