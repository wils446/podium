import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "./post.service";
import { build, perBuild } from "@jackfranklin/test-data-bot";
import { Post } from "./entity/post.entity";
import { faker } from "@faker-js/faker";
import { PostRepository } from "./repository/post.repository";
import { getRepositoryToken } from "@nestjs/typeorm";

const postBuilder = build({
	fields: {
		id: perBuild(() => faker.string.uuid()),
		title: perBuild(() => faker.hacker.phrase()),
		content: perBuild(() => faker.hacker.phrase()),
		isAnonymouse: perBuild(() => false),
		createdAt: perBuild(() => new Date()),
	},
	postBuild(post) {
		return Object.assign(new Post(), post);
	},
});

const mockRepository: jest.Mock<PostRepository> = jest
	.fn()
	.mockImplementation(() => {
		const posts = Array.from({ length: 10 }, () => postBuilder());

		return {
			getPosts: jest.fn().mockResolvedValue(posts),
			createPost: jest.fn(),
		};
	});

describe("PostService", () => {
	let service: PostService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{ provide: getRepositoryToken(Post), useClass: mockRepository },
				PostService,
			],
		}).compile();

		service = module.get<PostService>(PostService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should return many post", async () => {
		const posts = await service.getPosts();

		expect(Array.isArray(posts)).toBe(true);
	});
});
