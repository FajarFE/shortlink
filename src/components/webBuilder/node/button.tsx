import { withNode } from "node/node/connector";
import { Button } from "node/ui/button";
import { SettingsControl } from "../settings-control";

const draggable = true;

export const NodeButton = withNode(Button, {
	draggable,
});

(NodeButton as any).craft = {
	...(NodeButton as any).craft,
	related: {
		toolbar: SettingsControl,
	},
};

console.log(NodeButton);
