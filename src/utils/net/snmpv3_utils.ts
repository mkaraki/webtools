import { generateSecureRandomBigUint64 } from "../ts/random"

const generateEngineId = (): string => { 
    const rand24 = generateSecureRandomBigUint64(3);

    const engineId = Array.from(rand24)
        .map((v): string => { return v.toString(16).padStart(8, '0')})
        .join('');
    
    return engineId
}

export {
    generateEngineId,
};