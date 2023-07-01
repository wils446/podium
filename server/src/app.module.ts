import { Module } from "@nestjs/common";
import { PostModule } from "./post/post.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { databaseConfig, googleConfig, jwtConfig } from "./config";
import { LikeModule } from "./like/like.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [databaseConfig, googleConfig, jwtConfig],
			isGlobal: true,
		}),
		DatabaseModule,
		PostModule,
		UserModule,
		AuthModule,
		LikeModule,
	],
})
export class AppModule {}
