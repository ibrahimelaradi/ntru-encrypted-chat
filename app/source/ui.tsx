import React, { FC } from "react";
import { Text, Box } from "ink";
// import TextInput from "ink-text-input";
import Spinner from "ink-spinner";
import { useEvent, useID, useRoom } from "./socket";
import Rooms from "./rooms";
import Chat from "./chat";
// import Message from "./message";

const App: FC = () => {
	// const [input, setInput] = useState<string>("");
	// const [submittedText, setSubmittedText] = useState<string[]>([]);
	const id = useID();
	const { room, setRoom } = useRoom();
	useEvent("roomjoined", setRoom);

	// function onSubmit() {
	// 	setSubmittedText([...submittedText, input]);
	// 	setInput("");
	// }
	return (
		<>
			{!id ? (
				<Box borderStyle="round">
					<Spinner type="arc" />
					<Text> Connecting</Text>
				</Box>
			) : !room ? (
				<Rooms />
			) : (
				<Chat id={id} room={room} />
			)}
		</>
	);
};

module.exports = App;
export default App;
