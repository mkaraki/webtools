import '../../src/styles/loading.scss';

const input = document.getElementById('str') as HTMLInputElement;
input?.addEventListener('input', () => {
    const lines = input?.value.split('\n').length;
    (document.getElementById('counter-line') as HTMLSpanElement).innerText = lines.toString();
    (document.getElementById('counter') as HTMLSpanElement).innerText = (input?.value.length - (lines - 1)).toString();
});

console.log('loaded');