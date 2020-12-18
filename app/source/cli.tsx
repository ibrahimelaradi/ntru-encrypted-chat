import React from "react";
import { render } from "ink";
import App from "./ui";
import { Provider as SocketProvider } from "./socket";
import { NTRUProvider } from "./cypher/provider";

render(
	<NTRUProvider>
		<SocketProvider>
			<App />
		</SocketProvider>
	</NTRUProvider>
);
