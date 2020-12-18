import React, { createContext, FC, useEffect, useState } from "react";
import { readFileSync, statSync, writeFileSync } from "fs";
import { safeDump, safeLoad } from "js-yaml";
import { resolve } from "path";

const prefsPath = resolve(process.cwd(), "prefs.yaml");

export type Params = {
	f: number;
	g: number;
	q: number;
	endpoint: string;
	initializing: boolean;
};

export const Context = createContext<Params>({
	q: 59536,
	f: 83,
	g: 156,
	endpoint: "http://localhsot:3000",
	initializing: true,
});

export const NTRUProvider: FC = ({ children }) => {
	const [params, setParams] = useState<Omit<Params, "initializing">>({
		q: 59536,
		f: 83,
		g: 156,
		endpoint: "http://localhsot:3000",
	});
	const [initializing, setInitializing] = useState(true);

	function readParams() {
		setInitializing(true);
		try {
			const status = statSync(prefsPath);
			if (status.isFile()) {
				console.log("Found prefs.yaml");
				const content = readFileSync(prefsPath).toString();
				const prefs: string | object | undefined = safeLoad(content);
				if (!prefs) {
					console.log("Faild to load prefs.yaml content");
					setInitializing(false);
					return;
				}
				if (typeof prefs === "string") {
					console.log("Faild to load prefs.yaml content");
					setInitializing(false);
					return;
				}
				if (typeof prefs === "object") {
					if (
						Object.prototype.hasOwnProperty.call(prefs, "f") &&
						Object.prototype.hasOwnProperty.call(prefs, "q") &&
						Object.prototype.hasOwnProperty.call(prefs, "endpoint") &&
						Object.prototype.hasOwnProperty.call(prefs, "g")
					) {
						const parsedPrefs = prefs as Omit<Params, "initializing">;
						setParams(parsedPrefs);
						setInitializing(false);
					} else {
						console.log("Currupted prefs.yaml file!");
						setInitializing(false);
						return;
					}
				}
			}
		} catch (err) {
			console.log("No prefs.yaml file found, creating..");
			const prefs: Omit<Params, "initializing"> = params;
			const content = safeDump(prefs);
			writeFileSync(prefsPath, content);
			setInitializing(false);
		}
	}

	useEffect(() => {
		readParams();
	}, []);
	return (
		<Context.Provider value={{ ...params, initializing }}>
			{children}
		</Context.Provider>
	);
};
