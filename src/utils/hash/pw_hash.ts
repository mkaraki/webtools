import { genSalt, hash } from "bcrypt-ts/browser";

const generateBcryptPasswordHash = async (password: string, round: number = 10): Promise<string> => {
    const salt = await genSalt(round);
    const bcHash = await hash(password, salt);
    return bcHash;
}

export {
    generateBcryptPasswordHash,
}