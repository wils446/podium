import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: UserRepository
	) {}

	async createUser(data: CreateUserDto): Promise<User> {
		return await this.userRepository.createUser(data);
	}

	async getUserByGoogleId(googleId: string): Promise<User> {
		return await this.userRepository.getUserByGoogleId(googleId);
	}

	async getUser(id: string): Promise<User> {
		return await this.userRepository.getUser(id);
	}

	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.getAllUsers();
	}

	async updateUser(data: UpdateUserDto, user: User): Promise<void> {
		const userData = await this.userRepository.findOneBy({ id: user.id });

		userData.username = data.username;

		try {
			await userData.save();
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}
}
