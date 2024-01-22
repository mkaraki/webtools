import { KanaConvertOptions, processKanaConvert } from '../../src/utils/string/kana_convert';

const input = document.getElementById('inputStr') as HTMLTextAreaElement;
const command = document.getElementById('mode') as HTMLSelectElement;
const outputStr = document.getElementById('outputStr') as HTMLElement;

KanaConvertOptions.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.command;
    opt.innerText = option.description;
    command.appendChild(opt);
});

document.getElementById('form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputStr = input.value;

    const output = processKanaConvert(inputStr, command.value);

    outputStr.innerText = output;
});