import React, { useEffect } from "react";
import { Box, Text, useStdin } from "ink";
import Spinner from "ink-spinner";
import { useAppContext } from "./context/ntru";
import UI from "./ui";
import { Provider as SocketProvider } from "./socket";

export default function Initail() {
	const { initializing } = useAppContext();
	const { isRawModeSupported, setRawMode } = useStdin();

	useEffect(() => {
		console.log(isRawModeSupported);
		if (!isRawModeSupported) setRawMode(false);
		else setRawMode(true);
	}, []);

	return initializing ? (
		<Box flexGrow={1} borderStyle="round" flexDirection="row">
			<Spinner type="arc" />
			<Text>Initializing..</Text>
		</Box>
	) : (
		<SocketProvider>
			<UI />
		</SocketProvider>
	);
}
