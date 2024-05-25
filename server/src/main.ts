import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const configService = app.get<ConfigService>(ConfigService);
	const port = configService.getOrThrow<string>("port");
	await app.listen(+port || 3001);
}

bootstrap();
