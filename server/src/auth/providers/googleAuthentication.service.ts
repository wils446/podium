import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { UserRequest } from "../interfaces/UserRequest";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleAuthenticationService {
	private clientOAuth: OAuth2Client;

	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		const googleConfig = configService.getOrThrow("google");

		this.clientOAuth = new OAuth2Client({
			clientId: googleConfig.clientID,
			clientSecret: googleConfig.clientSecret,
		});
	}

	async authenticate(token: string) {
		try {
			const user = await this.verify(token);
			const jwtToken = await this.authService.googleLogin(user);
			return { jwtToken };
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async verify(token: string): Promise<UserRequest> {
		const ticket = await this.clientOAuth.verifyIdToken({
			idToken: token,
			audience: this.configService.getOrThrow("google.clientID"),
		});

		const payload = await ticket.getPayload();
		const { sub, name, email } = payload;

		return {
			username: name,
			googleId: sub,
			email,
		};
	}
}
