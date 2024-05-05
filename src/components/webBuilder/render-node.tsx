import { useEditor, useNode } from "@craftjs/core";
import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUpIcon, TrashIcon, MoveIcon } from "@radix-ui/react-icons";

const IndicatorDiv = styled.div`
	height: 30px;
	margin-top: -29px;
	font-size: 12px;
	line-height: 12px;

	svg {
		fill: #fff;
		width: 15px;
		height: 15px;
	}
`;

const Btn = styled.a`
	padding: 0 0px;
	opacity: 0.9;
	display: flex;
	align-items: center;
	> div {
		position: relative;
		top: -50%;
		left: -50%;
	}
`;

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
	const { id } = useNode();
	const { actions, query, isActive } = useEditor((_, query) => ({
		isActive: query.getEvent("selected").contains(id),
	}));

	const {
		isHover,
		isSelected,
		dom,
		moveable,
		connectors: { drag },
		parent,
		deletable,
		props,
	} = useNode((node) => ({
		isHover: node.events.hovered,
		isSelected: node.events.selected,
		dom: node.dom,
		name: node.data.custom.displayName || node.data.displayName,
		moveable: query.node(node.id).isDraggable(),
		deletable: query.node(node.id).isDeletable(),
		parent: node.data.parent,
		props: node.data.props,
	}));

	const currentRef = React.useRef<HTMLDivElement>();

	useEffect(() => {
		if (dom) {
			if (isActive || isHover) dom.classList.add("component-selected");
			else dom.classList.remove("component-selected");
		}
	}, [dom, isActive, isHover]);

	return <>{render}</>;
};
