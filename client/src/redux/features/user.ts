import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserResponse } from "../interfaces/IUserResponse";
import { userApi } from "../api/userApi";
import { RootState } from "../store";

type UserState = {
	user: IUserResponse | null;
	isLoading: boolean;
};

const initialState: UserState = {
	user: null,
	isLoading: false,
};

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserResponse>) => {
			state.user = action.payload;
		},
		logout: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(userApi.endpoints.getMe.matchPending, (state) => {
			state.isLoading = true;
			return state;
		});
		builder.addMatcher(
			userApi.endpoints.getMe.matchFulfilled,
			(state, action) => {
				state.user = action.payload;
				state.isLoading = false;
				return state;
			}
		);
		builder.addMatcher(userApi.endpoints.getMe.matchRejected, (state) => {
			state.isLoading = false;
			return state;
		});
	},
});

export const userReducer = user.reducer;
export const { logout, setUser } = user.actions;

export const selectCurrentUserState = (state: RootState) => state.userReducer;
