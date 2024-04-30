import { useEditor } from "@craftjs/core";
import React, { useState } from "react";
import { Layers } from "@craftjs/layers";

export const ControlPanel = () => {
	const [layersVisible, setLayerVisible] = useState(true);
	const [toolbarVisible, setToolbarVisible] = useState(true);
	const { active, related } = useEditor((state, query) => {
		// TODO: handle multiple selected elements
		const currentlySelectedNodeId = query.getEvent("selected").first();
		return {
			active: currentlySelectedNodeId,
			related:
				currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
		};
	});

	return (
		<div className='w-80 border-l h-auto'>
			<h3 className='py-2 px-4 border-b text-md font-semibold text-left'>
				Control Panel
			</h3>
			{active && related.toolbar && React.createElement(related.toolbar)}
			<Layers expandRootOnLoad={true} />
		</div>
	);
};
