/**
 * Splits an array into chunks of a given size
 */
export const arrayChunks = (array: Uint8Array, chunk_size: number) => Array(Math.ceil(
    array.length / chunk_size))
    .fill(0)
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));