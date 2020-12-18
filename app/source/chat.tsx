import React, { FC, useState } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";
import Message from "./message";
import { useEmitter, useEvent } from "./socket";
import { useDecrypt, useEncrypt } from "./cypher/ntru";

const useChars = true;

const Chat: FC<{ id: string; room: string }> = ({ id, room }) => {
	const encrypt = useEncrypt();
	const decrypt = useDecrypt();
	const [input, setInput] = useState<string>("");
	const [messages, setMessages] = useState<{ id: string; message: string }[]>(
		[]
	);
	useEvent(
		"message",
		(id: string, message: string) => {
			setMessages([...messages, { id, message: decrypt(message, useChars) }]);
		},
		[messages]
	);

	const sendMessage = useEmitter("message");

	function sendMessageAsync() {
		sendMessage(room, encrypt(input, useChars));
	}

	return (
		<>
			<Box borderStyle="round" flexGrow={1} flexDirection="column">
				<Text color="green" bold italic>
					NTRU Encrypted Chat System
				</Text>
				<Text color="green" bold italic>
					ID: {id} Room: {room}
				</Text>
				<Box
					flexBasis={3}
					flexDirection="column"
					borderStyle="round"
					alignItems="stretch"
					justifyContent="flex-end"
				>
					{messages.map((msg, index) => (
						<Message
							key={`msg_${index}`}
							author={msg.id}
							message={msg.message}
						/>
					))}
				</Box>
				<Box flexDirection="column" flexBasis={1} borderStyle="round">
					<Text color="grey">Write your message and hit enter</Text>
					<TextInput
						value={input}
						onChange={setInput}
						onSubmit={() => {
							sendMessageAsync();
							setInput("");
						}}
					/>
				</Box>
			</Box>
		</>
	);
};

export default Chat;
