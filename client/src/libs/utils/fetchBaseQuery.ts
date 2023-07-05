import { RootState } from "@/redux/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customFetchBaseQuery = (path: string) => {
	const baseUrl = (process.env.NEXT_PUBLIC_API_URL as string) + "/" + path;

	return fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).tokenReducer.token;

			if (token) headers.set("authorization", `Bearer ${token}`);

			return headers;
		},
	});
};
