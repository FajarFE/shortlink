import { Element } from "@craftjs/core";
import { withNode } from "node/node/connector";
import React from "react";
import { SettingsControl } from "../settings-control";

const draggable = true;
const droppable = true;

interface OneBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	totalBlocks?: number;
}

export const OneBlock = React.forwardRef<HTMLDivElement, OneBlockProps>(
	({ ...props }, ref) => {
		const Comp = "div";
		return <Comp ref={ref} {...props} />;
	}
);

OneBlock.displayName = "div";

export const NodeOneBlock = withNode(OneBlock, {
	draggable,
	droppable,
});

interface NodeTwoBlocksProps extends React.HTMLAttributes<HTMLDivElement> {}
export const NodeTwoBlocks = ({ ...props }: NodeTwoBlocksProps) => {
	return (
		<NodeOneBlock {...props}>
			<Element
				canvas
				is={NodeOneBlock as typeof NodeOneBlock & string}
				id='first-block'
			/>
			<Element
				canvas
				is={NodeOneBlock as typeof NodeOneBlock & string}
				id='second-block'
			/>
		</NodeOneBlock>
	);
};

interface NodeCustomBlocksProps extends React.HTMLAttributes<HTMLDivElement> {
	totalBlocks?: number;
}

export const NodeCustomBlocks = ({
	totalBlocks = 12, // Atur nilai default totalBlocks jika tidak diberikan
	...props
}: NodeCustomBlocksProps) => {
	const maxBlocks = Math.min(totalBlocks, 12); // Maksimum 12 blok
	const elements = [];

	for (let i = 0; i < maxBlocks; i++) {
		elements.push(
			<Element
				key={i}
				canvas
				is={NodeOneBlock as typeof NodeOneBlock & string}
				id={`block-${i}`}
			/>
		);
	}

	// Prop totalBlocks diteruskan ke NodeOneBlock
	return (
		<NodeOneBlock totalBlocks={totalBlocks} {...props}>
			{elements}
		</NodeOneBlock>
	);
};

NodeTwoBlocks.craft = {
	displayName: "div",
	props: {
		className: "flex flex-row m-2 p-4",
	},
	related: {
		toolbar: SettingsControl,
	},
};

(NodeCustomBlocks as any).craft = {
	...(NodeCustomBlocks as any).craft,
	props: {
		className: "flex flex-row m-2 p-4",
		totalBlocks: 3,
	},
	related: {
		toolbar: SettingsControl,
	},
};

(NodeOneBlock as any).craft = {
	...(NodeOneBlock as any).craft,
	props: {
		className: "w-full",
	},
	related: {
		toolbar: SettingsControl,
	},
};
