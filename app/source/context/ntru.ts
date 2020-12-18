import { decrypt, encrypt, generateKey } from "ntru";
import { Context, Params } from "./provider";
// import { f, g, q } from "./params.json";
import { useContext } from "react";

export function useEncrypt(): (msg: string, returnChars?: boolean) => string {
	const { f, g, q } = useContext(Context);
	return (msg: string, returnChars?: boolean) => {
		const h = generateKey(f, g, q);
		const codeArray = msg.split("").map((char) => char.charCodeAt(0));
		const cipherArray = codeArray.map((code) => encrypt(code, q, h));
		return returnChars
			? cipherArray.map((num) => String.fromCharCode(num)).join("")
			: cipherArray.join(" ");
	};
}

export function useDecrypt(): (cipher: string, fromChars?: boolean) => string {
	const { f, g, q } = useContext(Context);
	return (cipher: string, fromChars?: boolean) => {
		const numArray = fromChars
			? cipher.split("").map((char) => char.charCodeAt(0))
			: cipher.split(" ").map((num) => parseInt(num));
		const decryptedArray = numArray.map((num) => decrypt(num, q, f, g));
		return decryptedArray.map((num) => String.fromCharCode(num)).join("");
	};
}

export function useEndpoint(): string {
	return useContext(Context).endpoint;
}

export function useAppContext(): Params {
	return useContext(Context);
}
