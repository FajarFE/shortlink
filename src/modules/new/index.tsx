import {
	NodeHeroSection1,
	NodeIllustration,
} from "@/components/webBuilder/components/herosection";
import { withNode } from "@/components/webBuilder/node/connector";
import { NodeContainer } from "@/components/webBuilder/node/container";
import { Editor, Element, Frame } from "@craftjs/core";
import { Canvas } from "node/canvas";
import { ControlPanel } from "node/control-panel";
import { Header } from "node/header";
import { NodeButton } from "node/node/button";
import {
	NodeCard,
	NodeCardContent,
	NodeCardDescription,
	NodeCardFooter,
	NodeCardHeader,
	NodeCardImage,
	NodeCardTitle,
} from "node/node/card";
import { componentsMap } from "node/node/components-map";
import {
	NodeOneBlock,
	NodeTwoBlocks,
	NodeCustomBlocks,
} from "node/node/layout";
import { ReactIframe } from "node/react-iframe";
import { RenderNode } from "node/render-node";
import { SideMenu } from "node/side-menu";
import { Viewport } from "node/viewport";

export default function Awikwok() {
	return (
		<section className='w-full min-h-screen flex flex-col'>
			<Header />
			<Editor
				resolver={{
					NodeButton,
					Canvas,
					NodeCustomBlocks,
					NodeCardHeader,
					NodeCard,
					NodeCardImage,
					NodeCardContent,
					NodeCardDescription,
					NodeCardTitle,
					NodeCardFooter,
					NodeContainer,
					NodeOneBlock,
					NodeTwoBlocks,
				}}
				onRender={RenderNode}>
				<div className='flex flex-1 relative overflow-hidden'>
					<SideMenu componentsMap={componentsMap} />
					<Viewport>
						<ReactIframe
							title='my frame'
							className='p-4 w-full h-full page-container'>
							<Frame>
								<Element is={Canvas} id='ROOT' canvas>
									<NodeButton>Button 1</NodeButton>
									<NodeButton>Button 2</NodeButton>
									<NodeButton>Button 3</NodeButton>
									<NodeButton>Button 4</NodeButton>
									<Element
										canvas
										id='container-content'
										is={NodeContainer as typeof NodeContainer & string}>
										<NodeButton>Button 1</NodeButton>
										<NodeButton>Button 2</NodeButton>
										<NodeButton>Button 3</NodeButton>
										<NodeButton>Button 4</NodeButton>
									</Element>
								</Element>
							</Frame>
						</ReactIframe>
					</Viewport>
					<ControlPanel />
				</div>
			</Editor>
		</section>
	);
}
