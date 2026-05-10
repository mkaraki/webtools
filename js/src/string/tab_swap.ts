const tabToSpaceBtn = document.getElementById('tabToSpace') as HTMLButtonElement;
const spaceToTabBtn = document.getElementById('spaceToTab') as HTMLButtonElement;

const inputElm = document.getElementById('str') as HTMLTextAreaElement;
const spacingElm = document.getElementById('spacing') as HTMLInputElement;

const outputElem = document.getElementById('output') as HTMLTextAreaElement;

const genSpacing = () => {
    const space = spacingElm.valueAsNumber;

    if (space === 0)
        return '';

    return ' '.repeat(space);
}

const replace = (from: RegExp, to: string) => {
    const inputStr = inputElm.value;
    outputElem.value = inputStr.replace(from, to);
}

tabToSpaceBtn.onclick = () => {
    const space = genSpacing();
    replace(/\t/, space);
}

spaceToTabBtn.onclick = () => {
    const space = genSpacing();
    const spaceRegex = new RegExp(space);
    replace(spaceRegex, "\t");
}