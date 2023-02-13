const isIPv4Address = function (addr) {
    return /^([0-2]?\d?\d\.){3}[0-2]?\d?\d$/.test(addr);
}

const isIPv6Address = function (addr) {
    return /^([0-9a-f]{0,4}:)([0-9a-f]{1,4}:?|::){0,6}(:[0-9a-f]{0,4})$/i.test(addr);
}

const convertToIPv6AddressWithoutEmptyAndSeparator = function (fromip) {
    const shorten = fromip.split('::');
    if (shorten.length > 2) {
        alert('Unsupported format');
        return;
    }
    const beg = shorten[0].split(':');
    const end = shorten.length == 2 ? shorten[1].split(':') : [];
    const lsec = 8 - beg.length - end.length;
    let secs = '';
    [beg, Array(lsec).fill('0'), end].forEach(i => i.forEach(v => {
        secs += ('0'.repeat(4 - v.length) + v);
    }))
    return secs;
}

const getPtrAcceptable = function (fromip) {
    if (isIPv4Address(fromip)) {
        // v4 convert
        const splitted = fromip.split('.');
        const ret = `${parseInt(splitted[3])}.${parseInt(splitted[2])}.${parseInt(splitted[1])}.${parseInt(splitted[0])}`
            + '.in-addr.arpa.';
        return ret;
    } else if (isIPv6Address(fromip)) {
        const secs = convertToIPv6AddressWithoutEmptyAndSeparator(fromip);
        const result = secs.split('').reverse().join('.') + '.ip6.arpa.';
        return result;
    } else {
        return undefined;
    }
}