const calculateSHA512HashFromArrayBuffer = (aryBuffer: ArrayBuffer): Promise<string> => {
    return crypto.subtle.digest('SHA-512', aryBuffer).then((d) => {
        let bin = '';
        let bytes = new Uint8Array(d);
        for (let i = 0; i < bytes.byteLength; i++)
            bin += String.fromCharCode(bytes[i]);
        const b64hash: string = btoa(bin);
        return b64hash;
    });
}

const calculateSriFormatSHA512HashFromArrayBuffer = (aryBuffer: ArrayBuffer): Promise<string> => {
    return calculateSHA512HashFromArrayBuffer(aryBuffer).then((b64hash) => {
        return 'sha512-' + b64hash;
    });
}

export {
    calculateSHA512HashFromArrayBuffer,
    calculateSriFormatSHA512HashFromArrayBuffer,
}