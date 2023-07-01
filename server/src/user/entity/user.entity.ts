import { Like } from "src/like/entity/like.entity";
import { Post } from "src/post/entity/post.entity";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	createdAt: Date;

	@Column()
	googleId: string;

	@OneToMany(() => Post, (post) => post.user)
	post: Post[];

	@OneToMany(() => Like, (like) => like.user)
	like: Like[];
}
