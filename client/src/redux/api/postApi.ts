import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryDefinition,
} from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { ICreatePostDto } from "../interfaces";
import { IPostResponse } from "../interfaces/IPostResponse";
import { api } from "./api";

export const postApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getRandomPost: builder.query<IPostResponse, null>({
			query: () => "/posts/random",
		}),
		toggleLike: builder.mutation<null, { postId: string }>({
			query: ({ postId }) => ({
				url: `/posts/${postId}/like`,
				method: "POST",
			}),
			transformErrorResponse: (response) => response.status,
		}),
		createPost: builder.mutation<null, ICreatePostDto>({
			query: ({ content, isAnonymous, title }) => ({
				url: "/posts",
				method: "POST",
				body: { title, content, isAnonymous },
			}),
			transformErrorResponse: (response) => response.status,
		}),
		getMyPosts: builder.query<IPostResponse[], null>({
			query: () => "/posts/me",
		}),
		deletePostById: builder.mutation<null, { id: string }>({
			query: ({ id }) => ({ url: `/posts/${id}`, method: "DELETE" }),
			transformErrorResponse: (response) => response.status,
		}),
	}),
});

export const {
	useGetRandomPostQuery,
	useToggleLikeMutation,
	useCreatePostMutation,
	useDeletePostByIdMutation,
	useGetMyPostsQuery,
} = postApi;

export type GetRandomPostRefetch = () => QueryActionCreatorResult<
	QueryDefinition<
		null,
		BaseQueryFn<
			string | FetchArgs,
			unknown,
			FetchBaseQueryError,
			{},
			FetchBaseQueryMeta
		>,
		never,
		IPostResponse,
		"api"
	>
>;
