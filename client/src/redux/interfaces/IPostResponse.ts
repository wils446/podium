import { ILikeResponse } from "./ILikeResponse";
import { IUserResponse } from "./IUserResponse";

export interface IPostResponse {
	id: string;
	title: string;
	content: string;
	isAnonymous: false;
	createdAt: string;
	isLike: boolean;
	user: IUserResponse;
	like: ILikeResponse[];
}
