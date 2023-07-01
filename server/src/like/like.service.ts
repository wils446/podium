import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/post/entity/post.entity";
import { User } from "src/user/entity/user.entity";
import { Like } from "./entity/like.entity";
import { LikeRepository } from "./repository/like.repository";

@Injectable()
export class LikeService {
	constructor(
		@InjectRepository(Like) private readonly likeRepository: LikeRepository
	) {}

	async toggleLike(post: Post, user: User): Promise<void> {
		await this.likeRepository.toggleLike(post, user);
	}

	async getLike(post: Post, user: User): Promise<Like> {
		return await this.likeRepository.getLike(post, user);
	}
}
