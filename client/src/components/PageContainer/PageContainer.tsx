import { Navbar } from "../Navbar";

export const PageContainer: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div className="flex flex-col h-d-screen w-screen">
			<Navbar />
			<div className="flex-grow w-full flex justify-center">
				<div className="w-full lg:w-1/2 xl:w-2/5 2xl:w-2/5 bg-lightGrey h-full px-8 lg:px-10 2xl:px-16 py-10 drop-shadow-3xl">
					{children}
				</div>
			</div>
		</div>
	);
};
