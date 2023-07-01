import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import {
	TypeOrmModule,
	getDataSourceToken,
	getRepositoryToken,
} from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { DataSource } from "typeorm";
import { customUserRepositoryMethods } from "./repository/user.repository";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: getRepositoryToken(User),
			inject: [getDataSourceToken()],
			useFactory(dataSource: DataSource) {
				return dataSource
					.getRepository(User)
					.extend(customUserRepositoryMethods);
			},
		},
	],
	exports: [UserService],
})
export class UserModule {}
