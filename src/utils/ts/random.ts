interface RandomUint8Generator {
    (length: number): Uint8Array;
}

const generateRandomUint8 = (length: number): Uint8Array => {
    let randU8 = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        randU8[i] = Math.floor(Math.random() * 256);
        return randU8;
    }
    return randU8;
};

const generateSecureRandomUint8 = (length: number): Uint8Array => {
    let randU8 = new Uint8Array(length);
    window.crypto.getRandomValues(randU8);

    return randU8;
};

export {
    generateRandomUint8,
    generateSecureRandomUint8
};
export type { RandomUint8Generator };