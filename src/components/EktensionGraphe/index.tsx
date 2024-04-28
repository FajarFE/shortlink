"use client";
import ReactDOMServer from "react-dom/server";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import { Navbar } from "../BaseLayout/general";
import { NavbarRoot } from "../BaseLayout/navbarRoot";
import React from "react";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { Button, Slider, SnackbarContent } from "@material-ui/core";

export default function DefaultEditor() {
	const DataLayout = [
		{
			name: "1",
			url: "/admin",
		},
		{
			name: "2",
			url: "/profile",
		},
		{
			name: "3",
			url: "/admin",
		},
		{
			name: "3",
			url: "/admin",
		},
		{
			name: "3",
			url: "/admin",
		},
	];
	const navbarHtml = ReactDOMServer.renderToString(
		<NavbarRoot className=' bg-slate-950 z-[202]' data={DataLayout} />
	);

	console.log(navbarHtml);

	const onEditor = (editor: Editor) => {
		const addCmp = ({
			type,
			component,
			props,
		}: {
			type: string;
			component: React.ComponentType<any>;
			props: any;
		}) => {
			Components.addType(type, {
				extend: "react-component",
				model: {
					defaults: {
						...props,
						component,
					},
				},
				view: {
					/**
					 * We need this in order to render MUI styles in the canvas
					 */
					createReactEl(
						cmp: string,
						props:
							| (React.InputHTMLAttributes<HTMLInputElement> &
									React.ClassAttributes<HTMLInputElement>)
							| null
							| undefined
					) {
						const cmpMain = React.createElement(
							cmp,
							props,
							this.createReactChildWrap()
						);
						// eslint-disable-next-line react/no-children-prop
						return React.createElement(StylesProvider, {
							sheetsManager,
							jss: create({
								plugins: [...jssPreset().plugins],
								insertionPoint: this.em.get("Canvas").getDocument().head,
							}),
							children: cmpMain, // Pass cmpMain as a child
						});
					},
				},
				isComponent: (el) => el.tagName === type.toUpperCase(),
			});

			Blocks.add(type, {
				label: type,
				category: "MUI",
				content: { type },
			});
		};
		const { Blocks, Components } = editor;
		const sheetsManager = new Map();
		editor.BlockManager.add("navbar-block", {
			label: "Navbar Block",
			content: navbarHtml, // Include the rendered Navbar component directly as HTML string
			attributes: { class: "gjs-fonts gjs-f-b1" },
		});

		addCmp({
			type: "Snackbar",
			component: (props: any) =>
				React.createElement(SnackbarContent, {
					...props,
					message: props.children,
				}),
			props: {
				stylable: false,
				editable: true,
				traits: [],
			},
		});
	};

	return (
		<GjsEditor
			// Pass the core GrapesJS library to the wrapper (required).
			// You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
			grapesjs={grapesjs}
			// Load the GrapesJS CSS file asynchronously from URL.
			// This is an optional prop, you can always import the CSS directly in your JS if you wish.
			grapesjsCss='https://unpkg.com/grapesjs/dist/css/grapes.min.css'
			// GrapesJS init options
			options={{
				height: "100vh",
				storageManager: true,
				plugins: [
					"grapesjs-ga",
					"grapesjs-component-twitch",
					"grapesjs-plugin-forms",
					"grapesjs-tailwind",
				],
			}}
			onEditor={onEditor}
		/>
	);
}
