const inputElem = document.getElementById('str') as HTMLTextAreaElement;
const divider = document.getElementById('divider') as HTMLInputElement;

const result = document.getElementById('result') as HTMLTextAreaElement;

const inputChangeHandle = () => {
    const divideStr = divider.value;
    const lines = (inputElem?.value ?? '').split('\n');

    result.value = lines.join(divideStr);
};

inputElem?.addEventListener('input', inputChangeHandle);
divider?.addEventListener('input', inputChangeHandle);
