import { IUserResponse } from "../interfaces/IUserResponse";
import { api } from "./api";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<IUserResponse, null>({
			query: () => "/users",
			transformErrorResponse: (response) => response.status,
		}),
		updateMe: builder.mutation<null, { username: string }>({
			query: ({ username }) => ({
				url: "/users",
				method: "PUT",
				body: { username },
			}),
			transformErrorResponse: (response) => response.status,
		}),
	}),
});

export const { useUpdateMeMutation } = userApi;
