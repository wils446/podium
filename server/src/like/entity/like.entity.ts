import { Post } from "src/post/entity/post.entity";
import { User } from "src/user/entity/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Post, (post) => post.like)
	post: Post;

	@ManyToOne(() => User)
	user: User;
}
