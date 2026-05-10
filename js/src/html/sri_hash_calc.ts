import { calculateSriFormatSHA512HashFromArrayBuffer } from "../utils/hash/hash.ts";
import { setLoadingState } from  "../utils/loading.ts";

const getUri = (): string => {
    const elem: HTMLInputElement = document.getElementById('uri') as HTMLInputElement;
    if (elem === null) return '';
    return elem.value || '';
};

const applyUriAll = () => {
    const uri = getUri();
    const elems = document.getElementsByClassName('uri');
    for (let i = 0; i < elems.length; i++) {
        (elems[i] as HTMLInputElement).innerText = uri;
    }
}

const setSri = (sri: string) => {
    const elems = document.getElementsByClassName('sri');
    for (let i = 0; i < elems.length; i++) {
        (elems[i] as HTMLInputElement).innerText = sri;
    }
}

const calculateSriHash = () => {
    const uri = getUri().trim();

    if (uri === '') {
        return;
    }

    setLoadingState(true);
    setSri('Loading');

    fetch(uri)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then((arrayBuffer) => {
            calculateSriFormatSHA512HashFromArrayBuffer(arrayBuffer).then((hash: string) => {
                setSri(hash);
                applyUriAll();
            });
        })
        .catch((error) => {
            setSri('Error ' + error.message);
        })
        .finally(() => {
            setLoadingState(false);
        });
}

window.addEventListener('load', () => {
    document.getElementById('btn-calc')?.addEventListener('click', calculateSriHash);
});
