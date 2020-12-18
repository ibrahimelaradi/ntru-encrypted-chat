import React from "react";
import { render } from "ink";
import App from "./initial";
import { NTRUProvider } from "./context/provider";

render(
	<NTRUProvider>
		<App />
	</NTRUProvider>
);
