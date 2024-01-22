import { RandomUint8Generator } from "../ts/random";

const ASCII_NUMBERS = "0123456789";
const ASCII_UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ASCII_LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const ASCII_SPECIAL_CHARS = "!\"#$%&'()*+,-./[\\]^_`{|}~<>?@";

const fixGeneratedRandomAsciiCharByte = (byte: number, randomGenerator: RandomUint8Generator, filter: string): number => {
    if (byte > 0b1000_0000)
        byte -= 0b1000_0000;

    if (filter.indexOf(String.fromCharCode(byte)) === -1) {
        return fixGeneratedRandomAsciiCharByte(randomGenerator(1)[0], randomGenerator, filter);
    }

    return byte;
}

const generateRandomAsciiString = (length: number, randomGenerator: RandomUint8Generator, filter: string | null = null): string => {
    let randomBytes = randomGenerator(length);

    if (filter === null)
        filter = ASCII_NUMBERS + ASCII_UPPERCASE_CHARS + ASCII_LOWERCASE_CHARS + ASCII_SPECIAL_CHARS;

    for (let i = 0; i < length; i++) {
        let cur = randomBytes[i];

        randomBytes[i] = fixGeneratedRandomAsciiCharByte(cur, randomGenerator, filter);
    }

    return String.fromCharCode(...randomBytes);
};

export {
    ASCII_LOWERCASE_CHARS,
    ASCII_UPPERCASE_CHARS,
    ASCII_NUMBERS,
    ASCII_SPECIAL_CHARS,
    generateRandomAsciiString,
};