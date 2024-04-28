// components/user/Card.js
import React from "react";
import { Text } from "../text";
import { Button } from "../button";
import { Container } from "../container";

export const Card = ({
	background,
	padding = 20,
}: {
	background: string;
	padding: number;
}) => {
	return (
		<Container background={background} padding={padding}>
			<div className='text-only'>
				<Text text='Title' fontSize={20} />
				<Text text='Subtitle' fontSize={15} />
			</div>
			<div className='buttons-only'>
				<Button size='small' variant='contained' color='primary'>
					dwaidji
				</Button>
			</div>
		</Container>
	);
};
