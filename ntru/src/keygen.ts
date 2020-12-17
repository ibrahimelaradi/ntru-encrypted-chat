import { inverseModulo } from "./functions";

export function generateKey(f: number, g: number, q: number): number {
  const fInverse = inverseModulo(f, q);
  return (fInverse * g) % q;
}
