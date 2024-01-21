const crypto = (window.crypto || window.msCrypto);

const alphabetLittle = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetBig = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '0123456789'.split('');
const symbols = "!\"#$%&'()*+,-./[\\]^_`{|}~".split('');

const pwgen = (chars, length) => {
    let retStr = '';
    let randU8 = new Uint8Array(length);
    crypto.getRandomValues(randU8);

    randU8.forEach((char) => {
        let d = new Uint8Array(1);
        d[0] = char;
        while (true) {
            let c = d[0];
            if (c > 127) c -= 128;
            if (c < 0x20) c += 0x20;

            if (chars.indexOf(String.fromCharCode(c)) > -1) {
                retStr += String.fromCharCode(c);
                break;
            } else {
                crypto.getRandomValues(d);
            }
        }
    });

    return retStr;
}

function g() {
    const odr = document.getElementById("s").value.split('');
    let num = 0;
    let crs = [];
    odr.forEach(element => {
        switch (element) {
            case 'a':
                crs = crs.concat(alphabetLittle);
                break;

            case 'A':
                crs = crs.concat(alphabetBig);
                break;

            case 'n':
                crs = crs.concat(numbers);
                break;

            case 's':
                if (document.getElementById("c").value.length > 0) {
                    crs = crs.concat(document.getElementById("c").value.slice(''));
                } else {
                    crs = crs.concat(symbols);
                }
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                num *= 10;
                num += parseInt(element);
                break;

            default:
                break;
        }
    });

    document.getElementById("gen").innerText = pwgen(crs, num);
}