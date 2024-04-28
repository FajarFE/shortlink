import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "@/components/block/text";
import { Typography, Paper, Grid } from "@material-ui/core";
import { Topbar } from "@/components/block/topBar";
import { Container } from "@/components/block/container";
import { Card } from "@/components/block/card";
import { Toolbox } from "@/components/block/toolbox";
import { SettingsPanel } from "@/components/block/settingPanel";
import { Button } from "@/components/block/button";

export const CreatePage = () => {
	return (
		<div>
			<Typography variant='h5' align='center'>
				A super simple page editor
			</Typography>
			<Editor resolver={{ Card, Button, Text, Container }}>
				<Grid container spacing={3}>
					<Grid item xs>
						<Frame>
							<Container padding={5} background='#eee'>
								<Card background='red' padding={14} />
								<Button size='small' variant='outlined'>
									Click
								</Button>
								<Text fontSize={41} text='Hi world!' />
								<Container padding={6} background='#999'>
									<Text fontSize={41} text="It's me again!" />
								</Container>
							</Container>
						</Frame>
					</Grid>
					<Grid item xs={3}>
						<Paper className='wadad'>
							<Toolbox />
							<SettingsPanel />
						</Paper>
					</Grid>
				</Grid>
			</Editor>
		</div>
	);
};
