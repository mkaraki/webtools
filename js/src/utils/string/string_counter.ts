const countString = (str: string) => {
    const lines = str.split('\n');
    const lineNum = lines.length;
    const words = lines.map(line => line.split(' ')).flat().filter(word => word !== '');
    return {
        'lines': lineNum,
        'characters': str.length - (lineNum - 1),
        'words': words.length,
    };
}

export {
    countString,
}