import {countString} from '../utils/string/string_counter.ts';

const input = document.getElementById('str') as HTMLInputElement;
input?.addEventListener('input', () => {
    const countData = countString(input?.value);
    (document.getElementById('counter-line') as HTMLSpanElement).innerText = countData.lines.toString();
    (document.getElementById('counter') as HTMLSpanElement).innerText = countData.characters.toString();
});

console.log('loaded');