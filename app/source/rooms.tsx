import React, { FC } from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput as TextInput } from "ink-text-input";
import { useEmitter } from "./socket";

const Rooms: FC = () => {
	const joinRoom = useEmitter("roomjoin");

	return (
		<Box borderStyle="round" flexDirection="row">
			<Text>Room name: </Text>
			<TextInput
				showCursor
				onSubmit={(value) => {
					joinRoom(value);
				}}
			/>
		</Box>
	);
};

export default Rooms;
