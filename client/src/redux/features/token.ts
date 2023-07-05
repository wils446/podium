import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

type TokenState = {
	token: string | null;
};

const initialState: TokenState = {
	token: (getCookie("jwtToken") as string | undefined) || null,
};

export const token = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<{ token: string }>) => {
			console.log(1);
			state.token = action.payload.token;
			setCookie("jwtToken", action.payload.token);
		},
		resetToken: (state) => {
			state.token = null;
			setCookie("jwtToken", null);
		},
	},
});

export const tokenReducer = token.reducer;
export const { resetToken, setToken } = token.actions;
