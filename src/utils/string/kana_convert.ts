// @ts-ignore
import moji from 'moji';

const KanaConvertOptions = [
    {
        command: 'ZEtoHE',
        description: 'Convert Full width Alphabet / Number to Half width',
    },
    {
        command: 'HEtoZE',
        description: 'Convert Half width Alphabet / Number to Full width',
    },
    {
        command: 'ZStoHS',
        description: 'Convert Full width Space to Half width',
    },
    {
        command: 'HStoZS',
        description: 'Convert Half width Space to Full width',
    },
    {
        command: 'HGtoKK',
        description: 'ひらがな to カタカナ',
    },
    {
        command: 'KKtoHG',
        description: 'カタカナ to ひらがな',
    },
    {
        command: 'ZKtoHK',
        description: '全角カナ to 半角カナ',
    },
    {
        command: 'HKtoZK',
        description: '半角カナ to 全角カナ',
    }
];

const batchProcessKanaConvert = (input: string, commands: string[]): string => {
    let mojiObject = moji(input);
    commands.forEach((command) => {
        mojiObject = mojiObject.convert(command);
    });
    return mojiObject.toString();
};

const processKanaConvert = (input: string, command: string): string => {
    return batchProcessKanaConvert(input, [command]);
};

export {
    KanaConvertOptions,
    batchProcessKanaConvert,
    processKanaConvert,
};