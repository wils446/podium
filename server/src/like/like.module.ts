import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "./entity/like.entity";
import { DataSource } from "typeorm";
import { customLikeRepositoryMethods } from "./repository/like.repository";

@Module({
	providers: [
		LikeService,
		{
			provide: getRepositoryToken(Like),
			inject: [getDataSourceToken()],
			useFactory(dataSource: DataSource) {
				return dataSource
					.getRepository(Like)
					.extend(customLikeRepositoryMethods);
			},
		},
	],
	exports: [LikeService],
})
export class LikeModule {}
