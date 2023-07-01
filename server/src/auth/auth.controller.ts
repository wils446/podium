import { Body, Controller, Post } from "@nestjs/common";
import { GoogleAuthenticationService } from "./providers";
import { GetToken } from "./dtos/getToken.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly googleAuthService: GoogleAuthenticationService
	) {}

	@Post("/google-authentication")
	async authenticate(@Body() bodyPayload: GetToken) {
		return this.googleAuthService.authenticate(bodyPayload.token);
	}
}
