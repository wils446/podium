import {
	Controller,
	Get,
	Post,
	Delete,
	Body,
	Param,
	UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { GetUser } from "src/auth/decorator/getUser.decorator";
import { User } from "src/user/entity/user.entity";
import { JwtGuard } from "src/guard";
import { LikeService } from "src/like/like.service";

@Controller("posts")
@UseGuards(JwtGuard)
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly likeService: LikeService
	) {}

	@Get()
	async getPosts() {
		return await this.postService.getPosts();
	}

	@Get("me")
	async getPostByUserId(@GetUser() user: User) {
		return await this.postService.getPostByUserId(user.id);
	}

	@Get("random")
	async getRandomPost(@GetUser() user: User) {
		const post = await this.postService.getRandomPost();
		const like = await this.likeService.getLike(post, user);

		return {
			...post,
			isLike: like ? true : false,
		};
	}

	@Get(":id")
	async getPostById(@Param("id") id: string) {
		return await this.postService.getPostById(id);
	}

	@Post()
	async createPost(
		@Body() bodyPayload: CreatePostDto,
		@GetUser() user: User
	) {
		return await this.postService.createPost(bodyPayload, user);
	}

	@Delete(":id")
	async deletePostById(@Param("id") id: string) {
		return await this.postService.deleteBookById(id);
	}

	@Post(":id/like")
	async togglePostLike(@GetUser() user: User, @Param("id") id: string) {
		const post = await this.postService.getPostById(id);
		return await this.likeService.toggleLike(post, user);
	}
}
