import React from "react";
import ReactModal, { Props } from "react-modal";
import "./modal.css";

type ModalProps = Props;

export const Modal = React.forwardRef<ReactModal, ModalProps>(
	({ ...props }, ref) => {
		return (
			<ReactModal
				ariaHideApp={false}
				ref={ref}
				className="content"
				overlayClassName="overlay"
				{...props}
			/>
		);
	}
);
