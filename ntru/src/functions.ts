// Function that validates the parameters f, g, and q:

export function validateParams(f: number, g: number, q: number): boolean {
  if (gcd(f, g) != 1) {
    return false;
  }

  if (gcd(f, g * q) != 1) {
    return false;
  }

  return true;
}

// Function to compute the basic GCD of two numbers:

export function gcd(number: number, modulo: number): number {
  if (!modulo) {
    return number;
  }

  return gcd(modulo, number % modulo);
}

// Function to compute the extended GCD of two numbers:

export function extendedGcd(
  number: number,
  modulo: number
): { gcd: number; x: number; y: number } {
  if (number == 0) {
    return { gcd: modulo, x: 0, y: 1 };
  }

  let gcdOutput = extendedGcd(modulo % number, number);
  let gcd: number = gcdOutput.gcd;
  let x1: number = gcdOutput.x;
  let y1: number = gcdOutput.y;

  let x = y1 - Math.floor(modulo / number) * x1;
  let y = x1;

  gcd = Math.floor(gcd);
  x = Math.floor(x);
  y = Math.floor(y);

  return { gcd: gcd, x: x, y: y };
}

// Function that compute the multiplicative inverse of two numbers with respect to modulo:

export function inverseModulo(number: number, modulo: number): number {
  let gcdOutput = extendedGcd(number, modulo);

  let gcd: number = gcdOutput.gcd;
  let x: number = gcdOutput.x;
  let y: number = gcdOutput.y;

  if (x == NaN || x == undefined) {
    throw new Error("inverseModulo function: 'x' value is not valid.");
  }

  if (y == NaN || y == undefined) {
    throw new Error("inverseModulo function: 'y' value is not valid.");
  }

  if (gcd == 1) {
    // If the inverse is negative, transform it to positive form:

    if (x < 0) return (modulo + x) % modulo;
    else return x % modulo;
  } else throw new Error("inverseModulo function: inverse not found.");
}

// Function to generate a random value in a specific range:

export function generateRandomValue(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from) + from);
}

// Function to generate the key, h:

export function generateKey(f: number, g: number, q: number): number {
  // Find f inverse modulo q:

  let fInverse = inverseModulo(f, q);

  // Generate the key, h modulo q:

  let h = (fInverse * g) % q;

  return h;
}

// Function that generates the secret integers, f and g:

export function generateSecretIntegers(q: number): { f: number; g: number } {
  let qSquareroot2: number = Math.floor(Math.sqrt(q / 2));
  let qSquareroot4: number = Math.floor(Math.sqrt(q / 4));

  // Generate secret integers f and g:

  let fValue: number = generateRandomValue(1, qSquareroot2 - 1);
  let gValue: number = generateRandomValue(qSquareroot4 + 1, qSquareroot2 - 1);

  let paramValidity: boolean = validateParams(fValue, gValue, q);

  // Keep trying to find values that satisfy NTRU rules:
  // Note: the while-statement might not need to execute, reducing computation time.

  while (paramValidity != true) {
    fValue = generateRandomValue(1, qSquareroot2 - 1);
    gValue = generateRandomValue(qSquareroot4 + 1, qSquareroot2 - 1);
    paramValidity = validateParams(fValue, gValue, q);
  }

  return { f: fValue, g: gValue };
}
