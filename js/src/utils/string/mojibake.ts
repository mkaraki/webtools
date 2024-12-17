import Encoding from 'encoding-japanese';

const TextDecoderSupportedEncodings = [
    'utf-8',
    'utf-16',
    'utf-16le',
    'utf-16be',
    'ibm866',
    'iso-8859-1',
    'iso-8859-2',
    'iso-8859-3',
    'iso-8859-4',
    'iso-8859-5',
    'iso-8859-6',
    'iso-8859-7',
    'iso-8859-8',
    'iso-8859-8-i',
    'iso-8859-9',
    'iso-8859-10',
    'iso-8859-13',
    'iso-8859-14',
    'iso-8859-15',
    'iso-8859-16',
    'koi8-r',
    'koi8-u',
    'macintosh',
    'windows-874',
    'windows-1250',
    'windows-1251',
    'windows-1252',
    'windows-1253',
    'windows-1254',
    'windows-1255',
    'windows-1256',
    'windows-1257',
    'windows-1258',
    'x-mac-cyrillic',
    'gbk',
    'gb18030',
    'hz-gb-2312',
    'big5',
    'euc-jp',
    'iso-2022-jp',
    'shift-jis',
    'euc-kr',
    'iso-2022-kr',
    'iso-2022-cn',
];

const LibEncodingJapaneseSuportedEncodings = [
    'ASCII',
    'EUCJP',
    'JIS',
    'SJIS',
    'UTF8',
    'UTF16',
    'UTF16BE',
    'UTF16LE',
    'UTF32',
];

const resolveMojibake = (str: string, encoding: string): string => {
    console.log(str, encoding);
    const fakeUnicodeArray = Encoding.stringToCode(str);
    console.log(fakeUnicodeArray);
    const realUnicodeArray = Encoding.convert(fakeUnicodeArray, {
        to: encoding as Encoding.Encoding,
        from: 'UNICODE',
    });
    console.log(realUnicodeArray);
    const textDecoder = new TextDecoder('utf-8');
    const result = textDecoder.decode(new Uint8Array(realUnicodeArray));
    return result;
};

export {
    TextDecoderSupportedEncodings,
    LibEncodingJapaneseSuportedEncodings,
    resolveMojibake,
}