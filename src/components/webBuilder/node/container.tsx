import React from "react";
import { SettingsControl } from "../settings-control";
import { withNode } from "./connector";
import * as motion from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";

const draggable = true;
const droppable = true;

export const NodeContainer = withNode(Container, {
	draggable,
	droppable,
});

(NodeContainer as any).craft = {
	...(NodeContainer as any).craft,
	props: {
		className: "w-full",
	},
	related: {
		toolbar: SettingsControl,
	},
};
