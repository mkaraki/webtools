import { generateBcryptPasswordHash } from '../../src/utils/hash/pw_hash';
import '../../src/styles/loading.scss';

const form = document.getElementById('form');

const btnProcess = document.getElementById('btn-process') as HTMLButtonElement;

form?.addEventListener('submit', (event) => {
    event.preventDefault();

    document.body.classList.add('loading-dim');
    btnProcess.value = 'Processing...';

    const password = (document.getElementById('password') as HTMLInputElement).value;
    const round = parseInt((document.getElementById('round') as HTMLInputElement).value);
    generateBcryptPasswordHash(password, round)
        .then((hash) => {
            (document.getElementById('hash') as HTMLElement).innerText = hash;
        })
        .finally(() => {
            document.body.classList.remove('loading-dim');
            btnProcess.value = 'Process';
        });
});

console.log('loaded');