#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import App from "./ui";
import { Provider as SocketProvider } from "./socket";

render(
	<SocketProvider>
		<App />
	</SocketProvider>
);
