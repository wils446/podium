"use client";

import { useGoogleLogin } from "@/hooks";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
	const { handleSuccess } = useGoogleLogin();

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<main className="flex h-screen flex-col items-center justify-center p-5 sm:p-24">
				<div className="h-1/3 justify-between flex flex-col items-center space-y-10 text-center">
					<div>
						<h1 className="text-6xl sm:text-8xl font-bold text-sky-500">
							Podium
						</h1>
						<h3 className="text-sky-500 text-xl sm:text-2xl">
							Share Your Thoughts Here
						</h3>
					</div>
					<GoogleLogin useOneTap={true} onSuccess={handleSuccess} />
				</div>
			</main>
		</GoogleOAuthProvider>
	);
}
