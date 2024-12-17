import { generateEngineId } from "../../src/utils/net/snmpv3_utils";
import { generateRandomAsciiString, ASCII_LOWERCASE_CHARS, ASCII_UPPERCASE_CHARS, ASCII_NUMBERS } from "../../src/utils/string/random";
import { generateSecureRandomUint8 } from "../../src/utils/ts/random";

const generate = () => {
    const engineId = generateEngineId();

    document.querySelectorAll('.gen-engine-id').forEach((el) => {
        el.innerHTML = engineId;
    });

    const authPass = generateRandomAsciiString(64, generateSecureRandomUint8, ASCII_NUMBERS + ASCII_UPPERCASE_CHARS + ASCII_LOWERCASE_CHARS);

    document.querySelectorAll('.gen-auth-pass').forEach((el) => {
        el.innerHTML = authPass;
    });

    const privPass = generateRandomAsciiString(64, generateSecureRandomUint8, ASCII_NUMBERS + ASCII_UPPERCASE_CHARS + ASCII_LOWERCASE_CHARS);

    document.querySelectorAll('.gen-priv-pass').forEach((el) => {
        el.innerHTML = privPass;
    });
}

document.getElementById('btn-generate')?.addEventListener('click', () => {
    generate();
});

window.onload = () => {
    generate();
};