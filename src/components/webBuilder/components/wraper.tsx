import React from "react";
import {
	motion,
	HTMLMotionProps,
	inView,
	CustomValueType,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { withNode } from "../node/connector";
import { SettingsControl } from "../settings-control";

export interface WrapperAnimateProps extends HTMLMotionProps<"div"> {
	slideX?: number;
	slideY?: number;
	opacity?: number;
	scaleX?: number;
	inView?: boolean;
	Animated?: boolean;
	scaleY?: number;
	left?: string | number;
	right?: string | number;
	bottom?: string | number;
	top?: string | number;
	display?: string;
	position?: CustomValueType;
	background?: string;
	flexDirections?: CustomValueType;
	justifyContent?: string;
	itemContent?: string;
	delay?: number;
}

const WrapperAnimate = React.forwardRef<HTMLDivElement, WrapperAnimateProps>(
	(
		{
			slideX,
			scaleX,
			scaleY,
			slideY,
			opacity,
			delay,
			inView,
			Animated,
			left,
			right,
			bottom,
			top,
			background,
			display,
			justifyContent,
			itemContent,
			flexDirections,
			position,
			className,
			...props
		},
		ref
	) => {
		const leftValue = typeof left === "number" ? `${left}px` : left;
		const rightValue = typeof right === "number" ? `${right}px` : right;
		const bottomValue = typeof bottom === "number" ? `${bottom}px` : bottom;
		const topValue = typeof top === "number" ? `${top}px` : top;
		return (
			<motion.div
				ref={ref}
				style={{
					left: leftValue,
					right: rightValue,
					bottom: bottomValue,
					top: topValue,
					display: display,
					position: position,
					flexDirection: flexDirections,
					justifyContent: justifyContent,
					alignItems: itemContent,
					backgroundColor: background,
				}}
				initial={
					Animated || inView
						? {
								x: slideX,
								y: slideY,
								opacity: opacity,
								scaleX: scaleX,
								scaleY: scaleY,
						  }
						: undefined
				}
				whileInView={
					inView
						? {
								x: slideX,
								y: slideY,
								opacity: opacity,
								scaleX: scaleX,
								scaleY: scaleY,
						  }
						: undefined
				}
				animate={
					Animated
						? {
								x: slideX,
								y: slideY,
								opacity: opacity,
								scaleX: scaleX,
								scaleY: scaleY,
						  }
						: undefined
				}
				transition={
					Animated || inView
						? {
								type: "spring",
								delay: delay,
						  }
						: undefined
				}
				className={cn(className)}
				{...props}
			/>
		);
	}
);

WrapperAnimate.displayName = "WrapperAnimate";

const draggable = true;
const droppable = true;

export const NodeWrapper = withNode(WrapperAnimate, {
	draggable,
	droppable,
});

NodeWrapper.craft = {
	displayName: "Wrapper",
	props: {
		className: "w-20 flex",
	},
	related: {
		toolbar: SettingsControl,
	},
};
