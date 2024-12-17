const dnsRecordTypes = {
    1: 'A',
    28: 'AAAA',
    18: 'AFSDB',
    42: 'APL',
    257: 'CAA',
    60: 'CDNSKEY',
    59: 'CDS',
    37: 'CERT',
    5: 'CNAME',
    49: 'DHCID',
    32769: 'DLV',
    39: 'DNAME',
    48: 'DNSKEY',
    43: 'DS',
    55: 'HIP',
    65: 'HTTPS',
    45: 'IPSECKEY',
    25: 'KEY',
    36: 'KX',
    29: 'LOC',
    15: 'MX',
    35: 'NAPTR',
    2: 'NS',
    47: 'NSEC',
    50: 'NSEC3',
    51: 'NSEC3PARAM',
    12: 'PTR',
    46: 'RRSIG',
    17: 'RP',
    24: 'SIG',
    6: 'SOA',
    33: 'SRV',
    44: 'SSHFP',
    64: 'SVCB',
    32768: 'TA',
    249: 'TKEY',
    52: 'TLSA',
    250: 'TSIG',
    16: 'TXT',
    252: 'AXFR',
    251: 'IXFR',
    41: 'OPT',
};

type DoHQuerySimpleResponse = {
    name: string,
    type: number,
    TTL: number,
    data: string,
}

const resolveSimplyWithDoH = async (domain: string, type: string, endpoint: string): Promise<DoHQuerySimpleResponse[]> => {
    const param = new URLSearchParams({
        name: domain,
        type: type,
    });

    const url = new URL(endpoint);
    url.search = param.toString();

    return fetch(url.toString(), {
        "headers": {
            "accept": "application/dns-json",
        },
    })
        .then(res => res.json())
        .then(json => {
            if (json.Answer === undefined) {
                return [];
            }
            return json.Answer.map((record: any) => {
                return {
                    name: record.name,
                    type: record.type,
                    TTL: record.TTL,
                    data: record.data,
                };
            });
        });
}

export {
    dnsRecordTypes,
    resolveSimplyWithDoH,
}