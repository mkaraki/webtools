import 'bootstrap/scss/bootstrap.scss';
import { Modal} from 'bootstrap/js/index.esm';
import '../../src/styles/string/notepad.scss';
import {generateSecureRandomUint32} from "../../src/utils/ts/random.ts";
import {countString} from '../../src/utils/string/string_counter.ts';

const textArea = document.getElementById('textarea') as HTMLTextAreaElement;
const printerView = document.getElementById('printer-view') as HTMLDivElement;

const openerId = generateSecureRandomUint32(1)[0];

let lastFileOperationHandle: FileSystemFileHandle | null = null;

let findIndex = 0;

const findModal = new Modal('#findModal', {
    keyboard: true,
    backdrop: 'static',
})

const fontModal = new Modal('#fontModal', {
    keyboard: true,
})

const writeFile = async (fileHandle) => {
    const writable = await fileHandle.createWritable();
    const contents = textArea.value;
    const binary = new TextEncoder('utf-8').encode(contents).buffer;
    await writable.write(binary);
    await writable.close();
};

const save = async () => {
    if (lastFileOperationHandle === null) {
        await saveAs();
        return;
    }

    await writeFile(lastFileOperationHandle);
}

const saveAs = async () => {
    await (async () => {
        try {
            const fileHandle: FileSystemFileHandle = await self.showSaveFilePicker({
                suggestedName: 'Untitled.txt',
                id: openerId,
                startIn: 'documents',
                types: [
                    {
                        description: 'Text files',
                        accept: {
                            'text/plain': ['.txt'],
                        },
                    },
                ],
            });
            await writeFile(fileHandle);
            lastFileOperationHandle = fileHandle;
        } catch (error) {
            console.log(error);
        }
    })();
};

const open = async () => {
    await (async () => {
        try {
            const fileHandle: Array<FileSystemFileHandle> = await self.showOpenFilePicker({
                id: openerId,
                startIn: 'documents',
                types: [
                    {
                        description: 'Text files',
                        accept: {
                            'text/plain': ['.txt'],
                        },
                    },
                ],
            });

            if (fileHandle.length === 0) {
                alert('No file selected.')
                return;
            }

            const file = await fileHandle[0].getFile();
            const binary = await file.arrayBuffer();
            textArea.value = new TextDecoder('utf-8').decode(binary);
            changeContent();
            lastFileOperationHandle = fileHandle[0];
        } catch (error) {
            console.log(error);
        }
    })();
}

const isSelected = () => {
    return textArea.selectionStart !== textArea.selectionEnd;
}

const getSelectionText = (): string|undefined => {
    if (!isSelected()) {
        return undefined;
    }

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    return textArea.value.substring(start, end);
}

const selectionChange = () => {
    const location = textArea.selectionEnd;

    const lines = textArea.value.split('\n');
    let checked = 0;
    for (let i = 0; i < lines.length; i++) {
        const lineLen = lines[i].length;
        if (checked /* last char of prev line */ <= location && location <= checked + lineLen) {
            (document.getElementById('cursor-line') as HTMLSpanElement).innerText = (i + 1).toString();
            (document.getElementById('cursor-col') as HTMLSpanElement).innerText = (location - checked + 1).toString()
            break;
        }
        checked += lineLen + 1;
    }

    if (isSelected()) {
        document.getElementById('selected-counter').classList.toggle('d-none', false);
        document.getElementById('counter-selection').innerText = getSelectionText().length.toString();
    } else {
        document.getElementById('selected-counter').classList.toggle('d-none', true);
    }
};

const changeContent = () => {
    printerView.innerText = textArea.value;

    const contents = textArea.value;
    const countData = countString(contents);
    (document.getElementById('counter-line') as HTMLSpanElement).innerText = countData.lines.toString();
    (document.getElementById('counter') as HTMLSpanElement).innerText = countData.characters.toString();
    (document.getElementById('counter-word') as HTMLSpanElement).innerText = countData.words.toString();
};

const insertDateTime = () => {
    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    // TODO: Rewrite this to not use execCommand.
    textArea.focus();
    document.execCommand("insertText", false, `${dateString} ${timeString}`);
    changeContent();
}

const undo = () => {
    textArea.focus();
    // TODO: Rewrite this to not use execCommand.
    document.execCommand("undo");
    changeContent();
}

const redo = () => {
    textArea.focus();
    // TODO: Rewrite this to not use execCommand.
    document.execCommand("redo");
    changeContent();
}

const copy = async () => {
    if (!isSelected()) {
        return;
    }
    const text = getSelectionText();
    await navigator.clipboard.writeText(text);
}

const cut = async () => {
    if (!isSelected()) {
        return;
    }
    const text = getSelectionText();
    await navigator.clipboard.writeText(text);
    textArea.focus();
    // TODO: Rewrite this to not use execCommand.
    document.execCommand("delete");
}

const paste = async () => {
    const text = await navigator.clipboard.readText();
    if (isSelected()) {
        textArea.focus();
        // TODO: Rewrite this to not use execCommand.
        document.execCommand("delete");
    }
    textArea.focus();
    document.execCommand("insertText", false, text);
}

const deleteStr = () => {
    if (!isSelected()) {
        return;
    }
    textArea.focus();
    // TODO: Rewrite this to not use execCommand.
    document.execCommand("delete");
}

const search = () => {
    // TODO: if not selected, use current line as search term.
    if (!isSelected()) {
        return;
    }
    const searchStr = encodeURI(getSelectionText());
    window.open('https://www.bing.com/search?q=' + searchStr, '_blank');
}

const findNext = () => {
    if (findIndex > textArea.value.length) {
        findIndex = 0;
    }
    const searchStr = (document.getElementById('find-text') as HTMLInputElement).value;

    if (searchStr === '') {
        return;
    }

    const target = textArea.value.substring(findIndex);
    const index = target.indexOf(searchStr, findIndex);
    if (index === -1) {
        alert('Not found.');
        return;
    }
    textArea.setSelectionRange(index, index + searchStr.length);
    findIndex = index + searchStr.length;
    selectionChange();
    findModal.hide();
    textArea.focus();
}

const findPrev = () => {
    if (findIndex < 0) {
        findIndex = textArea.value.length;
    }
    const searchStr = (document.getElementById('find-text') as HTMLInputElement).value;

    if (searchStr === '') {
        return;
    }

    const target = textArea.value.substring(0, findIndex);
    const index = target.lastIndexOf(searchStr);
    if (index === -1) {
        alert('Not found.');
        return;
    }
    textArea.setSelectionRange(index, index + searchStr.length);
    findIndex = index;
    selectionChange();
    findModal.hide();
    textArea.focus();
}

const gotoLine = () => {
    let line = parseInt(prompt('Enter line number:'));
    if (isNaN(line)) {
        return;
    }

    const lines = textArea.value.split('\n');

    if (line <= 0) {
        line = 1;
    }
    if (line > lines.length) {
        line = lines.length;
    }

    const availLines = lines.slice(0, line);
    const location = availLines.join('\n').length;

    textArea.focus();
    textArea.setSelectionRange(location, location);
}

document.getElementById('btn-save').onclick = await save;
document.getElementById('btn-saveas').onclick = await saveAs;
document.getElementById('btn-open').onclick = await open;
document.getElementById('btn-status').onclick = () => {
    document.getElementById('textarea-container').classList.toggle('status');
    document.getElementById('status-bar').classList.toggle('d-none');
    document.getElementById('state-status').classList.toggle('check-enabled');
}
document.getElementById('btn-wrap').onclick = () => {
    textArea.classList.toggle('wordwrap');
    document.getElementById('state-status').classList.toggle('check-enabled');
}
document.getElementById('btn-print').onclick = () => {
    window.print();
}
document.getElementById('btn-datetime').onclick = insertDateTime;
document.getElementById('btn-undo').onclick = undo;
document.getElementById('btn-redo').onclick = redo;
document.getElementById('btn-copy').onclick = await copy;
document.getElementById('btn-cut').onclick = await cut;
document.getElementById('btn-paste').onclick = await paste;
document.getElementById('btn-delete').onclick = await deleteStr;
document.getElementById('btn-sel-all').onclick = () => {
    textArea.setSelectionRange(0, textArea.value.length);
}

document.getElementById('btn-search').onclick = search;

document.querySelectorAll('.btns-find-next').forEach((element) => {
    element.onclick = findNext;
});
document.querySelectorAll('.btns-find-prev').forEach((element) => {
    element.onclick = findPrev;
});

document.getElementById('btn-find').onclick = () => {
    findModal.show();
}
//document.getElementById('btn-replace').onclick = () => {
//    findModal.show();
//}

document.getElementById('btn-font').onclick = () => {
    fontModal.show();
}

document.getElementById('find-text').oninput = () => {
    findIndex = 0;
}

document.getElementById('btn-goto').onclick = gotoLine;

document.onkeydown = async (e) => {
    if (e.ctrlKey) {
        switch (e.key) {
            case 's':
                e.preventDefault();
                if (e.shiftKey)
                    await saveAs();
                else
                    await save();
                break;
            case 'o':
                e.preventDefault();
                await open();
                break;
            /*case 'z':
                e.preventDefault();
                undo();
                break;
            case 'y':
                e.preventDefault();
                redo();
                break;
            case 'c':
                e.preventDefault();
                await copy();
                break;
            case 'x':
                e.preventDefault();
                await cut();
                break;
            case 'v':
                e.preventDefault();
                await paste();
                break;*/
            case 'f':
                e.preventDefault();
                findModal.show();
                break;
            case 'p':
                e.preventDefault();
                window.print();
                break;
            case 'e':
                e.preventDefault();
                search();
                break;
            case 'h':
                e.preventDefault();
                findModal.show();
                break;
            case 'g':
                e.preventDefault();
                gotoLine();
                break;
        }
    }

    if (e.shiftKey && e.key === 'F3') {
        e.preventDefault();
        findPrev();
        return;
    }
    if (e.key === 'F3') {
        e.preventDefault();
        findNext();
        return;
    }

    if (e.key === 'F5') {
        e.preventDefault();
        insertDateTime();
        return;
    }
}

let fontPostscriptDict: { string: {'family': string, 'style': string} } = {
    // NOTE: These are preset fonts. not postscript name and defined in modal's options (value attribute).
    'serif': { 'family': 'serif', 'style': 'regular' },
    'sans-serif': { 'family': 'sans-serif', 'style': 'regular' },
    'monospace': { 'family': 'monospace', 'style': 'regular' },
    'cursive': { 'family': 'cursive', 'style': 'regular' },
    'fantasy': { 'family': 'fantasy', 'style': 'regular' },
    'system-ui': { 'family': 'system-ui', 'style': 'regular' },
    'ui-serif': { 'family': 'ui-serif', 'style': 'regular' },
    'ui-sans-serif': { 'family': 'ui-sans-serif', 'style': 'regular' },
    'ui-monospace': { 'family': 'ui-monospace', 'style': 'regular' },
    'ui-rounded': { 'family': 'ui-rounded', 'style': 'regular' },
    'emoji': { 'family': 'emoji', 'style': 'regular' },
    'math': { 'family': 'math', 'style': 'regular' },
    'fangsong': { 'family': 'fangsong', 'style': 'regular' },
};

const fontSize = document.getElementById('font-size') as HTMLInputElement;
{
    const sampleArea = document.getElementById('font-sample') as HTMLDivElement;
    const fontList = document.getElementById('font-family');
    fontList.onchange = () => {
        const postScriptName = (document.getElementById('font-family') as HTMLSelectElement).value;
        const fontInfo = fontPostscriptDict[postScriptName];
        sampleArea.style.fontFamily = fontInfo.family;
        sampleArea.style.fontStyle = fontInfo.style;
    }
    fontSize.oninput = () => {
        const strSize = fontSize.value;
        const size = parseFloat(strSize);

        if (size <= 0) {
            return;
        }

        if (isNaN(size)) {
            return;
        }

        sampleArea.style.fontSize = strSize + 'pt';
    }


    if (window.queryLocalFonts !== undefined) {
        let fontFamilies: {string: FontData[]} = {};
        const fonts: FontData[] = await window.queryLocalFonts();
        for (const font of fonts) {
            if (fontFamilies[font.family] === undefined) {
                fontFamilies[font.family] = [];
            }

            fontFamilies[font.family].push(font);

            if (fontPostscriptDict[font.postscriptName] === undefined) {
                fontPostscriptDict[font.postscriptName] = { 'family': font.family, 'style': font.style };
            }
        }

        Object.keys(fontFamilies).forEach((family) => {
            const optGroup = document.createElement('optgroup');
            optGroup.label = family;
            fontFamilies[family].forEach((font) => {
                const option = document.createElement('option');
                option.value = font.postscriptName;
                option.innerText = font.fullName;
                option.style.fontFamily = font.family;
                option.style.fontStyle = font.style;
                optGroup.appendChild(option);
            });
            fontList.appendChild(optGroup);
        });
    }
}

document.getElementById('btn-font-apply').onclick = () => {
    const postScriptName = (document.getElementById('font-family') as HTMLSelectElement).value;
    const fontInfo = fontPostscriptDict[postScriptName];

    textArea.style.fontFamily = fontInfo.family;
    printerView.style.fontFamily = fontInfo.family;
    textArea.style.fontStyle = fontInfo.style;
    printerView.style.fontStyle = fontInfo.style;

    const strSize = fontSize.value;
    const size = parseFloat(strSize);

    if (size <= 0) {
        return;
    }

    if (isNaN(size)) {
        return;
    }

    textArea.style.fontSize = strSize + 'pt';
    printerView.style.fontSize = strSize + 'pt';

    fontModal.hide();
}

textArea.onselectionchange = selectionChange;
textArea.oninput = changeContent;