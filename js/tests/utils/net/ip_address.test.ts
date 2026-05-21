import { expect, test, describe } from 'vitest'

import { isIPv6Address } from '../../../src/utils/net/ip_address.ts';

describe('isIPv6Address', () => {
    test('accepts valid IPv6 forms', () => {
        const validAddresses = [
            // By GitHub Copilot
            '2001:db8:85a3:0:0:8a2e:370:7334',
            '2001:db8:85a3::8a2e:370:7334',
            '2001:db8::1',
            '::',
            '::1',

            // By Gemini
            '2001:0db8:0000:0000:0000:0000:0000:0005',
            '2001:db8:0:0:0:0:0:5',
            '2001:db8::5',
            '2001:0db8:0001:0000:0000:0000:0000:0001',
            '2001:db8:1:0:0:0:0:1',
            '2001:db8:1::1',
            '2001:0db8:0000:0000:0000:0000:0000:0080',
            '2001:db8:0:0:0:0:0:80',
            '2001:db8::80',
            '2001:0db8:0002:0000:021a:2bff:fe3c:4d5e',
            '2001:db8:2:0:21a:2bff:fe3c:4d5e',
            '2001:db8:2::21a:2bff:fe3c:4d5e',
            '2001:0db8:aaaa:bbbb:0000:0000:0000:0000',
            '2001:db8:aaaa:bbbb:0:0:0:0',
            '2001:db8:aaaa:bbbb::',
            '2001:0db8:0000:0000:0000:8a2e:0370:7334',
            '2001:db8:0:0:0:8a2e:370:7334',
            '2001:db8::8a2e:370:7334',
            '2001:0db8:face:b00c:0000:0000:0000:0001',
            '2001:db8:face:b00c:0:0:0:1',
            '2001:db8:face:b00c::1',
            '2001:0db8:dead:beef:0000:0000:0000:0022',
            '2001:db8:dead:beef:0:0:0:22',
            '2001:db8:dead:beef::22',
        ];

        validAddresses.forEach((address) => {
            expect(isIPv6Address(address)).toBe(true);
        });
    });

});