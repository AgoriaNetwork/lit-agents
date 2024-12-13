/**
 * Converts a bytes32 value to an Ethereum address
 * @param _input The bytes32 input value
 * @returns The converted Ethereum address
 */
export const bytes32ToAddress = (_input: string): string => {
  // Convert bytes32 string to BigInt for bitwise operations
  const inputBigInt = BigInt(_input);

  // Check if first 12 bytes are zero by shifting right 160 bits and checking upper bits
  const upperBits = inputBigInt >> 160n;
  if (upperBits !== 0n) {
    throw new Error('First 12 bytes must be zero');
  }

  // Extract last 20 bytes (160 bits) for the address
  const addressBigInt = BigInt(inputBigInt & ((1n << 160n) - 1n));

  // Convert to hex string and ensure proper formatting
  const addressHex = addressBigInt.toString(16).padStart(40, '0');
  return `0x${addressHex}`;
};

/**
 * Converts an Ethereum address to bytes32 format
 * @param _input The Ethereum address
 * @returns The bytes32 representation
 */
export const addressToBytes32 = (_input: string): string => {
  // Remove '0x' prefix if present
  const cleanAddress = _input.replace('0x', '');

  // Convert address to BigInt
  const addressBigInt = BigInt(`0x${cleanAddress}`);

  // Convert to bytes32 (pad to 32 bytes/64 chars)
  const bytes32Hex = addressBigInt.toString(16).padStart(64, '0');
  return `0x${bytes32Hex}`;
};
