import { generateSecureRandomUint16 } from "../ts/random";

const generateIPv6FD00_48 = (): Uint16Array => {
    const randomGlobalID = generateSecureRandomUint16(3);
    const zeroRemain = new Uint16Array(5);

    randomGlobalID[0] = (randomGlobalID[0] >> 8) | 0xfd00;

    const ipv6Octets = new Uint16Array(8);
    ipv6Octets.set(randomGlobalID);
    ipv6Octets.set(zeroRemain, 3);

    return ipv6Octets;
};

export {
    generateIPv6FD00_48,
};