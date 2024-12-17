const putStringToInputOrInnerText = (inputOrInnerText: HTMLInputElement | HTMLElement, text: string) => {
    if (inputOrInnerText instanceof HTMLInputElement) {
        inputOrInnerText.value = text;
    } else {
        inputOrInnerText.innerText = text;
    }
};

export {
    putStringToInputOrInnerText,
};