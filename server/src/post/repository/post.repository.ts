import type { Repository } from "typeorm";
import { Post } from "../entity/post.entity";
import { CreatePostDto } from "../dtos/create-post.dto";
import {
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { User } from "src/user/entity/user.entity";

export interface PostRepository extends Repository<Post> {
	this: Repository<Post>;

	createPost: (
		this: Repository<Post>,
		data: CreatePostDto,
		user: User
	) => Promise<void>;
	getPosts: (this: Repository<Post>) => Promise<Post[]>;
	deletePost: (this: Repository<Post>, id: string) => Promise<void>;
	getPostById: (this: Repository<Post>, id: string) => Promise<Post>;
	getRandomPost: (this: Repository<Post>) => Promise<Post>;
	getPostByUserId: (
		this: Repository<Post>,
		userId: string
	) => Promise<Post[]>;
}

export const CustomPostRepositoryMethod: Pick<
	PostRepository,
	| "createPost"
	| "getPosts"
	| "deletePost"
	| "getPostById"
	| "getRandomPost"
	| "getPostByUserId"
> = {
	async createPost(data, user) {
		const { content, isAnonymous, title } = data;
		const createdAt = new Date();

		const post = this.create({
			title,
			content,
			isAnonymous,
			createdAt,
			user,
		});

		try {
			await post.save();
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	},

	async getPosts() {
		const posts = await this.createQueryBuilder().getMany();

		return posts;
	},

	async deletePost(id) {
		const result = await this.delete({ id });
		if (result.affected === 0) {
			throw new NotFoundException(`Post with id ${id} is not found`);
		}
	},

	async getPostById(id) {
		const post = await this.findOneBy({ id });

		if (!post)
			throw new NotFoundException(`post with id ${id} is not found`);

		return post;
	},

	async getRandomPost() {
		const post = await this.createQueryBuilder()
			.select()
			.orderBy("RANDOM()")
			.limit(1)
			.getOne();

		const postDetail = await this.findOneBy({ id: post.id });

		return postDetail;
	},

	async getPostByUserId(userId: string) {
		const post = await this.find({ where: { user: { id: userId } } });

		return post;
	},
};
