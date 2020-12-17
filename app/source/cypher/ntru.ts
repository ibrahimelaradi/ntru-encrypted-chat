import { decrypt, encrypt, generateKey } from "ntru";
import { f, g, q } from "./params.json";

export function useEncrypt(): (msg: string, returnChars?: boolean) => string {
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
	return (cipher: string, fromChars?: boolean) => {
		const numArray = fromChars
			? cipher.split("").map((char) => char.charCodeAt(0))
			: cipher.split(" ").map((num) => parseInt(num));
		const decryptedArray = numArray.map((num) => decrypt(num, q, f, g));
		return decryptedArray.map((num) => String.fromCharCode(num)).join("");
	};
}
