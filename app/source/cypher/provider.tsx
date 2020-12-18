import React, { createContext, FC, useEffect, useState } from "react";
import { readFile, stat, writeFile } from "fs";
import { promisify } from "util";
import { safeDump, safeLoad } from "js-yaml";
import { resolve } from "path";
import { f as devF, g as devG, q as devQ } from "./params.json";

const prefsPath = resolve(process.cwd(), "prefs.yaml");

const readFileAsync = promisify(readFile);
const statAsync = promisify(stat);
const writeFileAsync = promisify(writeFile);

type Params = {
	f: number;
	g: number;
	q: number;
};

export const Context = createContext<Params>({
	q: 59536,
	f: 83,
	g: 156,
});

export const NTRUProvider: FC = ({ children }) => {
	const [params, setParams] = useState<Params>({
		q: 59536,
		f: 83,
		g: 156,
	});

	async function readParamsAsync() {
		try {
			const status = await statAsync(prefsPath);
			if (status.isFile()) {
				console.log("Found prefs.yaml");
				const content = (await readFileAsync(prefsPath)).toString();
				const prefs: string | object | undefined = safeLoad(content);
				if (!prefs) {
					console.log("Faild to load prefs.yaml content");
					return;
				}
				if (typeof prefs === "string") {
					console.log("Faild to load prefs.yaml content");
					return;
				}
				if (typeof prefs === "object") {
					if (
						Object.prototype.hasOwnProperty.call(prefs, "f") &&
						Object.prototype.hasOwnProperty.call(prefs, "q") &&
						Object.prototype.hasOwnProperty.call(prefs, "g")
					) {
						const parsedPrefs = prefs as { q: number; g: number; f: number };
						setParams({ f: parsedPrefs.f, g: parsedPrefs.g, q: parsedPrefs.q });
					} else {
						console.log("Currupted prefs.yaml file!");
						return;
					}
				}
			}
		} catch (err) {
			console.log("No prefs.yaml file found, creating..");
			const prefs = { f: devF, g: devG, q: devQ };
			const content = safeDump(prefs);
			await writeFileAsync(prefsPath, content);
		}
	}

	useEffect(() => {
		readParamsAsync();
	}, []);
	return <Context.Provider value={params}>{children}</Context.Provider>;
};
