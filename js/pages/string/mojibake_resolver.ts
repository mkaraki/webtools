import { LibEncodingJapaneseSuportedEncodings, resolveMojibake } from '../../src/utils/string/mojibake';

const fromEnc = document.getElementById('fromEnc') as HTMLSelectElement;

LibEncodingJapaneseSuportedEncodings.forEach((enc) => {
    const opt = document.createElement('option');
    opt.value = enc;
    opt.innerText = enc;
    fromEnc.appendChild(opt);
});

document.getElementById('form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = (document.getElementById('inputStr') as HTMLTextAreaElement).value;
    const encoding = fromEnc.value;

    const output = resolveMojibake(input, encoding);

    (document.getElementById('outputStr') as HTMLElement).innerText = output;
});
