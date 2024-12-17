import { generateSecureRandomUint8 } from '../../src/utils/ts/random';
import { ASCII_LOWERCASE_CHARS, ASCII_UPPERCASE_CHARS, ASCII_NUMBERS, ASCII_SPECIAL_CHARS, generateRandomAsciiString } from '../../src/utils/string/random';

const symbolsParent = document.getElementById('symbols-parent');

ASCII_SPECIAL_CHARS.split('').forEach((char, i) => {
    const holder = document.createElement('span');

    const input = document.createElement('input');
    input.id = `special-${i}`;
    input.dataset.char = char;
    input.classList.add('symbol-checkbox');
    input.type = 'checkbox';
    input.checked = false;

    const label = document.createElement('label');
    label.htmlFor = `special-${i}`;
    label.innerText = char;

    holder.appendChild(input);
    holder.appendChild(label);

    symbolsParent?.appendChild(holder);
});

const symbolCheckboxes = document.querySelectorAll<HTMLInputElement>('input.symbol-checkbox[type="checkbox"]');

document.getElementById('symbols-select-all')?.addEventListener('click', () => {
    symbolCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });
});

document.getElementById('symbols-select-none')?.addEventListener('click', () => {
    symbolCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
});

document.getElementById('btn-generate')?.addEventListener('click', () => {
    const length = parseInt((document.getElementById('digits') as HTMLInputElement).value);

    const useLowercase = (document.getElementById('lowercase') as HTMLInputElement).checked;
    const useUppercase = (document.getElementById('uppercase') as HTMLInputElement).checked;
    const useNumbers = (document.getElementById('number') as HTMLInputElement).checked;

    let filter = '';

    if (useLowercase)
        filter += ASCII_LOWERCASE_CHARS;
    if (useUppercase)
        filter += ASCII_UPPERCASE_CHARS;
    if (useNumbers)
        filter += ASCII_NUMBERS;

    symbolCheckboxes.forEach((checkbox) => {
        if (checkbox.checked)
            filter += checkbox.dataset.char;
    });

    const output = generateRandomAsciiString(length, generateSecureRandomUint8, filter);

    (document.getElementById('output') as HTMLElement).innerText = output;
});