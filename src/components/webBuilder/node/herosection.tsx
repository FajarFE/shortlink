import { NodeOneBlock, NodeTwoBlocks } from "../node/layout";
import { Element } from "@craftjs/core";
import { NodeWrapper, WrapperAnimateProps } from "./wraper"; // Corrected import
import { withNode } from "../node/connector";
import { SettingsControl } from "../settings-control";
import classNames from "classnames";
import { cn } from "@/lib/utils";
import React from "react";

interface IllustrationProps extends React.HTMLAttributes<HTMLDivElement> {}

// eslint-disable-next-line react/display-name
const NodeIllustrationSection = React.forwardRef<
	HTMLDivElement,
	IllustrationProps
>(({ className, ...props }, ref) => {
	return (
		<div className={cn(className)} ref={ref} {...props}>
			<div className='absolute top-0 left-0 w-full h-4/5 bg-yellow-300 rounded-xl'></div>
			<div className='absolute bottom-0 right-0 w-full h-full bg-yellow-300 rounded-xl'></div>
		</div>
	);
});
NodeIllustrationSection.displayName = "Ilustrator";

const NodeIllustration = withNode(NodeIllustrationSection, {
	draggable: true,
	droppable: true,
});

NodeIllustration.craft = {
	...NodeIllustration.craft,
	props: {
		className: "w-full h-[400px] relative col-span-6",
	},
	related: {
		toolbar: SettingsControl,
	},
};

interface ContainerSectionProps extends React.HTMLAttributes<HTMLDivElement> {}
const ContainerSection = React.forwardRef<
	HTMLDivElement,
	ContainerSectionProps
>(({ className, ...props }, ref) => {
	return <div className={cn(className)} ref={ref} {...props} />;
});

ContainerSection.displayName = "ContainerSection";

const NodeContainerSection = withNode(ContainerSection, {
	draggable: true,
	droppable: true,
});

NodeContainerSection.craft = {
	...NodeContainerSection.craft,
	props: {
		className: "grid grid-cols-6",
	},
	related: {
		toolbar: SettingsControl,
	},
};

export { NodeIllustration, NodeContainerSection };
