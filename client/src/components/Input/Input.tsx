import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
	[
		"px-2 py-2",
		"bg-inputBg",
		"text-gray-400",
		"rounded-md",
		"hover:outline-none",
		"focus-visible:outline-none",
		"shadow-inner-input",
		"resize-none",
	],
	{
		variants: {
			inputWidth: {
				full: "sm:w-full",
				"3/4": "sm:w-3/4",
				"1/4": "sm:w-1/4",
				"1/2": "sm:w-1/2",
				none: "",
			},
			mobileWidth: {
				full: "w-full",
				"3/4": "w-3/4",
				"1/4": "w-1/4",
				"1/2": "w-1/2",
				none: "",
			},
			maxHeight: {
				none: "max-h-none",
				max: "max-h-96",
			},
		},
		defaultVariants: {
			inputWidth: "none",
			mobileWidth: "none",
			maxHeight: "none",
		},
	}
);

type InputVariantsProps = VariantProps<typeof inputVariants>;
type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	InputVariantsProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ inputWidth, mobileWidth, ...props }, ref) => (
		<input
			className={`${inputVariants({ inputWidth, mobileWidth })}`}
			ref={ref}
			spellCheck={false}
			{...props}
		/>
	)
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
	InputVariantsProps;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ inputWidth, mobileWidth, maxHeight, ...props }, ref) => (
		<textarea
			className={`${inputVariants({
				inputWidth,
				mobileWidth,
				maxHeight,
			})} h-full sm:h-72`}
			ref={ref}
			spellCheck={false}
			{...props}
		/>
	)
);
