import React from "react";
import { Paper } from "@material-ui/core";
import { useNode } from "@craftjs/core";

export const Container = ({
	background,
	padding = 0,
	children,
}: {
	background: string;
	padding: number;
	children: React.ReactNode;
}) => {
	const {
		connectors: { connect, drag },
	} = useNode();
	return (
		<Paper
			ref={(ref: any) => connect(drag(ref))}
			style={{ margin: "5px 0", background, padding: `${padding}px` }}>
			{children}
		</Paper>
	);
};
