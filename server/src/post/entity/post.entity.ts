import { Like } from "src/like/entity/like.entity";
import { User } from "src/user/entity/user.entity";
import {
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	Entity,
	ManyToOne,
	OneToMany,
	JoinTable,
} from "typeorm";

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column()
	isAnonymous: boolean;

	@Column()
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.post, { eager: true })
	user: User;

	@OneToMany(() => Like, (like) => like.post, { eager: true })
	@JoinTable()
	like: Like[];
}
