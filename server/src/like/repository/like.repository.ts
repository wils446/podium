import { Repository } from "typeorm";
import {
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { Like } from "../entity/like.entity";
import { User } from "src/user/entity/user.entity";
import { Post } from "src/post/entity/post.entity";

export interface LikeRepository extends Repository<Like> {
	toggleLike: (this: LikeRepository, post: Post, user: User) => Promise<void>;
	likePost: (this: LikeRepository, post: Post, user: User) => Promise<void>;
	unlikePost: (this: LikeRepository, likeId: string) => Promise<void>;
	getLike: (this: LikeRepository, post: Post, user: User) => Promise<Like>;
}

export const customLikeRepositoryMethods: Pick<
	LikeRepository,
	"toggleLike" | "likePost" | "unlikePost" | "getLike"
> = {
	async getLike(post, user) {
		const like =
			(await this.findOneBy({
				user: { id: user.id },
				post: { id: post.id },
			})) || null;

		return like;
	},
	async likePost(post, user) {
		const like = await this.create({ user, post });

		try {
			await like.save();
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	},
	async unlikePost(likeId) {
		const result = await this.delete(likeId);
		if (result.affected == 0)
			throw new NotFoundException(`like with id ${likeId} is not found`);
	},
	async toggleLike(post, user) {
		const like = await this.getLike(post, user);

		if (like) this.unlikePost(like.id);
		else this.likePost(post, user);
	},
};
