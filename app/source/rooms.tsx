import React, { FC, useEffect, useState } from "react";
import { Text, Box } from "ink";
import Select from "ink-select-input";
import Spinner from "ink-spinner";
import { UncontrolledTextInput as TextInput } from "ink-text-input";
import fetch from "node-fetch";
import { useEmitter } from "./socket";

const Rooms: FC = () => {
	const [rooms, setRooms] = useState<{ name: string }[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [newRoom, setNewRoom] = useState<boolean>(false);
	const createRoom = useEmitter("roomcreate");
	const joinRoom = useEmitter("roomjoin");

	async function getRooms() {
		setLoading(true);
		try {
			const response = await fetch("http://localhost:3000/rooms", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "GET",
			});
			if (response.status === 200) {
				const result: { name: string }[] = await response.json();
				setRooms(result.map((x) => ({ name: x.name })));
			} else {
				setError("Error retrieving rooms");
			}
		} catch (err) {
			setError("Error retreiving rooms");
		}
		setLoading(false);
	}

	useEffect(() => {
		getRooms();
	}, []);
	return (
		<Box flexGrow={1} flexDirection="column">
			<Text color="green">Select a room or create a new one</Text>
			{!newRoom ? (
				!loading ? (
					!error ? (
						<Select
							items={[
								{
									label: "Create a new room",
									value: "new-room",
								},
								...rooms.map((room) => ({
									label: room.name,
									value: room.name,
								})),
							]}
							onSelect={(item) => {
								if (item.value === "new-room") {
									setNewRoom(true);
									return;
								}
								joinRoom(item.value);
							}}
						/>
					) : (
						<Text color="red">{error}</Text>
					)
				) : (
					<Box borderStyle="round">
						<Spinner type="arc" />
						<Text> Loading rooms..</Text>
					</Box>
				)
			) : (
				<Box borderStyle="round" flexDirection="row">
					<Text>New room name: </Text>
					<TextInput
						showCursor
						onSubmit={(value) => {
							createRoom(value);
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Rooms;
