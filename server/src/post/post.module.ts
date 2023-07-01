import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import {
	TypeOrmModule,
	getDataSourceToken,
	getRepositoryToken,
} from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { DataSource } from "typeorm";
import { CustomPostRepositoryMethod } from "./repository/post.repository";
import { LikeModule } from "src/like/like.module";

@Module({
	imports: [TypeOrmModule.forFeature([Post]), LikeModule],
	controllers: [PostController],
	providers: [
		PostService,
		{
			provide: getRepositoryToken(Post),
			inject: [getDataSourceToken()],
			useFactory(dataSource: DataSource) {
				return dataSource
					.getRepository(Post)
					.extend(CustomPostRepositoryMethod);
			},
		},
	],
})
export class PostModule {}
