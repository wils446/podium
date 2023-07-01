import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import {
	NotFoundException,
	InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

export interface UserRepository extends Repository<User> {
	this: Repository<User>;

	getAllUsers: (this: Repository<User>) => Promise<User[]>;
	getUser: (this: Repository<User>, id: string) => Promise<User>;
	createUser: (this: Repository<User>, data: CreateUserDto) => Promise<User>;
	getUserByGoogleId: (
		this: Repository<User>,
		googleId: string
	) => Promise<User>;
}

export const customUserRepositoryMethods: Pick<
	UserRepository,
	"getUser" | "createUser" | "getUserByGoogleId" | "getAllUsers"
> = {
	async getUser(id) {
		const user = await this.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(`User with id ${id} is not found`);
		}

		return user;
	},

	async getUserByGoogleId(googleId) {
		const user = (await this.findOneBy({ googleId })) || null;

		return user;
	},

	async getAllUsers() {
		const users = await this.createQueryBuilder().getMany();

		return users;
	},

	async createUser(data) {
		const { email, googleId, username } = data;

		const createdAt = new Date();
		const user = await this.create({
			username,
			email,
			googleId,
			createdAt,
		});

		try {
			await user.save();
			return user;
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	},
};
