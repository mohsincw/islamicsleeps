const ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; // base58

/** 12-char base58 id for shareable story URLs (~70 bits of entropy). */
export function generateShortId(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

export function isShortId(value: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{12}$/.test(value);
}
