import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { PostRepository } from "./repository/post.repository";
import { CreatePostDto } from "./dtos/create-post.dto";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post) private readonly postRepository: PostRepository
	) {}

	async createPost(data: CreatePostDto, user: User): Promise<void> {
		return await this.postRepository.createPost(data, user);
	}

	async getPosts(): Promise<Post[]> {
		return await this.postRepository.getPosts();
	}

	async deleteBookById(id: string): Promise<void> {
		return await this.postRepository.deletePost(id);
	}

	async getPostById(id: string): Promise<Post> {
		return await this.postRepository.getPostById(id);
	}

	async getRandomPost(): Promise<Post> {
		return await this.postRepository.getRandomPost();
	}

	async getPostByUserId(userId: string): Promise<Post[]> {
		return await this.postRepository.getPostByUserId(userId);
	}
}
