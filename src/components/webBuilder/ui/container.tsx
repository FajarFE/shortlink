import { cn } from "@/lib/utils";
import * as React from "react";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type Position = "static" | "relative" | "absolute" | "fixed";
type Float = "left" | "right" | "none";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string | number;
	height?: string | number;
	backgroundColor?: string;
	position?: Position | undefined;
	display?: string;
	top?: string | number;
	bottom?: string | number;
	left?: string | number;
	right?: string | number;
	float?: Float | undefined;
	flexDirection?: FlexDirection | undefined;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	(
		{
			className,
			width,
			height,
			flexDirection,
			display,
			top,
			bottom,
			right,
			left,
			float,
			position,
			backgroundColor,
			...props
		},
		ref
	) => (
		<div
			ref={ref}
			style={{
				width: width,
				height: height,
				backgroundColor: backgroundColor,
				display: display,
				position: position,
				flexDirection: flexDirection,
				top: top,
				bottom: bottom,
				right: right,
				left: left,
				float: float,
			}}
			className={cn(className)}
			{...props}
		/>
	)
);

Container.displayName = "Container";

export { Container };
