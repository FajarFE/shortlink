import React from "react";
import { Button as MaterialButton, ButtonProps } from "@material-ui/core";
import { useNode } from "@craftjs/core";

interface Props extends ButtonProps {
	children: React.ReactNode;
}

export const Button = ({ size, variant, color, children }: Props) => {
	const {
		connectors: { connect, drag },
	} = useNode();
	return (
		<MaterialButton
			ref={(ref: any) => connect(drag(ref))}
			size={size}
			variant={variant}
			color={color}>
			{children}
		</MaterialButton>
	);
};
