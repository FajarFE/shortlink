import { withNode } from "node/node/connector";
import { Button } from "node/ui/button";
import { SettingsControl } from "../settings-control";

const draggable = true;

export const NodeButton = withNode(Button, {
	draggable,
});

NodeButton.craft = {
	...NodeButton.craft,
	related: {
		toolbar: SettingsControl,
	},
};

console.log(NodeButton);
