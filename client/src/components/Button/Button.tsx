import { cva, type VariantProps } from "class-variance-authority";
import { UseFormRegisterReturn } from "react-hook-form";
import "./button.css";

const buttonVariants = cva("disabled:cursor-default", {
	variants: {
		size: {
			xl: "sm:w-28 h-8 rounded-md",
			"circle-xl": "w-12 h-12 rounded-full",
			"3xl": "w-full sm:w-40 lg:text-sm 2xl:text-base h-12 sm:h-auto sm:py-4 rounded-lg",
			"2xl": "w-full sm:w-40 h-12 rounded-lg",
			modal: "w-full py-1 rounded-lg",
		},
		color: {
			"blue-gradient":
				"bg-gradient-to-bl from-sky-600 to-sky-300 hover:bg-gradient-to-br disabled:to-sky-600",
			red: "bg-red-700 hover:bg-opacity-75",
			dark: "bg-stone-950 hover:bg-opacity-75",
		},
		textColor: {
			sky: "text-sky-500",
			white: "text-white",
		},
	},
});

type ButtonVariantsProp = VariantProps<typeof buttonVariants>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariantsProp & {
		buttonType: "default" | "toggle-switch";
		formProps?: UseFormRegisterReturn;
	};

export const Button: React.FC<ButtonProps> = ({
	children,
	color,
	size,
	className,
	textColor,
	formProps,
	buttonType = "default",
	...props
}) => {
	if (buttonType === "toggle-switch") {
		return (
			<div className="relative inline-block align-middle select-none w-10">
				<input
					type="checkbox"
					className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-400"
					{...formProps}
				/>
				<label
					htmlFor=""
					className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
				></label>
			</div>
		);
	}

	return (
		<button
			className={`${buttonVariants({
				size,
				color,
				textColor,
			})} ${className} `}
			{...props}
		>
			{children}
		</button>
	);
};
