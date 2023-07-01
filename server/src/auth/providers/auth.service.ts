import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserRequest } from "../interfaces/userRequest";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entity/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async googleLogin(userRequest: UserRequest) {
		const { googleId, email, username } = userRequest;

		let user = await this.userService.getUserByGoogleId(googleId);
		if (!user)
			user = await this.userService.createUser({
				email,
				googleId,
				username,
			});

		const jwtToken = await this.generateJwtToken(user);

		return jwtToken;
	}

	async generateJwtToken(user: User): Promise<string> {
		const payload = { sub: user.id };
		const jwtToken = await this.jwtService.signAsync(payload);

		return jwtToken;
	}
}
