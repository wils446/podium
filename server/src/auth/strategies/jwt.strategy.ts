import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow("jwt.secret"),
		});
	}

	async validate(payload: { sub: string }) {
		const user = await this.userService.getUser(payload.sub);
		if (!user)
			throw new UnauthorizedException(
				`User with id ${payload.sub} is not found`
			);

		return user;
	}
}
