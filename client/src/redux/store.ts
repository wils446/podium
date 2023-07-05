import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { tokenReducer, userReducer } from "./features";

export const store = configureStore({
	reducer: {
		tokenReducer,
		userReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
