import { useEditor } from "@craftjs/core";
import { Tooltip } from "@material-ui/core";
import cx from "classnames";
import React, { useState } from "react";
import styled from "styled-components";
import { ImCheckmark } from "react-icons/im";
import { BiSolidCustomize } from "react-icons/bi";
import { FaRedoAlt } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { getOutputCode, getOutputHTMLFromId } from "@/lib/code-gen";
import { CodeView } from "node/code-view";
import { DrawerTrigger, DrawerContent, Drawer } from "node/ui/drawer";
import { CodeIcon } from "@radix-ui/react-icons";

const HeaderDiv = styled.div`
	width: 100%;
	height: 45px;
	z-index: 99999;
	position: relative;
	padding: 0px 10px;
	background: #d4d4d4;
	display: flex;
`;

const Btn = styled.a`
	display: flex;
	align-items: center;
	padding: 5px 15px;
	border-radius: 3px;
	color: #fff;
	font-size: 13px;
	svg {
		margin-right: 6px;
		width: 12px;
		height: 12px;
		fill: #fff;
		opacity: 0.9;
	}
`;

const Item = styled.a<{ disabled?: boolean }>`
	margin-right: 10px;
	cursor: pointer;
	svg {
		width: 20px;
		height: 20px;
		fill: #707070;
	}
	${(props) =>
		props.disabled &&
		`
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = () => {
	const { enabled, canUndo, canRedo, actions, query } = useEditor(
		(state, query) => ({
			enabled: state.options.enabled,
			canUndo: query.history.canUndo(),
			canRedo: query.history.canRedo(),
		})
	);
	const [output, setOutput] = useState<string | null>();
	const [htmlOutput, setHtmlOutput] = useState<string | null>();

	const generateCode = () => {
		const { importString, output } = getOutputCode(query.getNodes());
		console.log("printing ", importString, output);
		setOutput(`${importString}\n\n${output}`);
	};

	const generateHTML = () => {
		const htmlOutput = getOutputHTMLFromId("canvas-iframe");
		setHtmlOutput(htmlOutput);
	};

	console.log(output, "output");

	const [open, setOpen] = useState(false);
	const [htmlOpen, setHtmlOpen] = useState(false);

	return (
		<HeaderDiv className='header text-white transition w-full'>
			<div className='items-center flex w-full px-4 justify-between'>
				{enabled ? null : (
					<div className='bg-black px-3 rounded-md flex justify-center items-center py-2'>
						<Drawer
							open={open}
							onOpenChange={(value: boolean) => {
								generateCode();
								setOpen(value);
							}}>
							<DrawerTrigger>
								<CodeIcon />
							</DrawerTrigger>

							<DrawerContent className='h-[75vh]'>
								<CodeView codeString={output as string} />
							</DrawerContent>
						</Drawer>
					</div>
				)}
				{enabled && (
					<div className='flex-1 flex'>
						<Tooltip title='Undo' placement='bottom'>
							<Item disabled={!canUndo} onClick={() => actions.history.undo()}>
								<FaUndo />
							</Item>
						</Tooltip>
						<Tooltip title='Redo' placement='bottom'>
							<Item disabled={!canRedo} onClick={() => actions.history.redo()}>
								<FaRedoAlt />
							</Item>
						</Tooltip>
					</div>
				)}
				<div className='flex'>
					<Btn
						className={cx([
							"transition cursor-pointer",
							{
								"bg-green-400": enabled,
								"bg-primary": !enabled,
							},
						])}
						onClick={() => {
							actions.setOptions((options) => (options.enabled = !enabled));
						}}>
						{enabled ? <ImCheckmark /> : <BiSolidCustomize />}
						{enabled ? "Finish Editing" : "Edit"}
					</Btn>
				</div>
			</div>
		</HeaderDiv>
	);
};
