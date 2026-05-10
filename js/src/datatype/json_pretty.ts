const input = document.getElementById('json-str') as HTMLTextAreaElement;
const output = document.getElementById('json-output') as HTMLTextAreaElement;
const error = document.getElementById('error-log') as HTMLElement;

const read_json = () => {
    const original_json_str = input.value;
    console.log(original_json_str);
    try {
        return JSON.parse(original_json_str);
    }
    catch (e) {
        error.innerText = `Failed to parse JSON: ${e}. See console for details.`;
        console.error(e);
        throw e;
    }
}

const json_pretty = () => {
    const data = read_json();
    output.value = JSON.stringify(data, null, 2);
}

const json_compress = () => {
    const data = read_json();
    output.value = JSON.stringify(data, null, 0);
}