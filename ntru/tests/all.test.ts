import { decrypt, encrypt, generateKey } from "../src";
import { samples } from "./samples";
describe.each(samples)("Test case %#", (f, g, q, m, e, r) => {
  let encrypted: number;
  it("Encryption", () => {
    const h = generateKey(f, g, q);
    encrypted = encrypt(m, q, h, r);
    expect(encrypted).toBe(e);
  });
  it("Decryption", () => {
    if (!encrypted) throw new Error("Encrypted message was not calculated");
    const b = decrypt(encrypted, q, f, g);
    expect(b).toBe(m);
  });
});
