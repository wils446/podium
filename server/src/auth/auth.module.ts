import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService, GoogleAuthenticationService } from "./providers";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return {
					secretOrPrivateKey: configService.getOrThrow("jwt.secret"),
					signOptions: {
						expiresIn: configService.getOrThrow("jwt.expiresIn"),
					},
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleAuthenticationService],
})
export class AuthModule {}
