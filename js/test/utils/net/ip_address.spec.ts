import { describe, it, expect } from 'vitest'
import {
    isIPv4Address,
    isIPv6Address,
    isIPv6AddressWithoutEmpty,
    convertToIPv6AddressWithoutEmptyAndSeparator,
    convertToIPv6AddressWithoutEmpty,
    getPtrAcceptableAddress,
    formatIPv6OctetNumbersToStringAddress,
    formatIPv6OctetNumbersToStringAddressPartiallyFromStart,
} from "../../../src/utils/net/ip_address";

describe("isIPv4Address", () => {
    it("should correctly identify valid IPv4 addresses", () => {
        expect(isIPv4Address('192.168.1.1')).toBe(true);
        expect(isIPv4Address('0.0.0.0')).toBe(true);
        expect(isIPv4Address('255.255.255.255')).toBe(true);
    });

    it("should correctly identify invalid IPv4 addresses", () => {
        expect(isIPv4Address('192.168.1')).toBe(false);
        expect(isIPv4Address('192.168.1.256')).toBe(false);
        expect(isIPv4Address('192.168.1.1.1')).toBe(false);
        expect(isIPv4Address('192.168.1.abc')).toBe(false);
    });
});

describe("isIPv6Address", () => {
    it("should correctly identify valid IPv6 addresses", () => {
        expect(isIPv6Address('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
        expect(isIPv6Address('2001:db8:85a3:0:0:8a2e:370:7334')).toBe(true);
        expect(isIPv6Address('2001:db8:85a3::8a2e:370:7334')).toBe(true);
        expect(isIPv6Address('::1')).toBe(true);
        expect(isIPv6Address('::')).toBe(true);
    });

    it("should correctly identify invalid IPv6 addresses", () => {
        expect(isIPv6Address('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(false);
        expect(isIPv6Address('2001:db8:85a3::8a2e:370::7334')).toBe(false);
        expect(isIPv6Address('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(false);
        expect(isIPv6Address(':2001:db8:85a3:0:0:8a2e:370:7334')).toBe(false);
        expect(isIPv6Address('2001:db8:85a3:0:0:8a2e:370')).toBe(false);
    });
});

describe("isIPv6AddressWithoutEmpty", () => {
    it("should correctly identify valid IPv6 addresses without empty sections", () => {
        expect(isIPv6AddressWithoutEmpty('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
        expect(isIPv6AddressWithoutEmpty('1234:5678:9abc:def0:1234:5678:9abc:def0')).toBe(true);
    });

    it("should correctly identify invalid IPv6 addresses", () => {
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370:7334')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3::8a2e:370:7334')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('::1')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('::')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3::8a2e:370::7334')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(false);
        expect(isIPv6AddressWithoutEmpty(':2001:db8:85a3:0:0:8a2e:370:7334')).toBe(false);
        expect(isIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370')).toBe(false);
    });
});

describe("convertToIPv6AddressWithoutEmptyAndSeparator", () => {
    it("should correctly convert valid IPv6 addresses", () => {
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('20010db885a3000000008a2e03707334');
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3:0:0:8a2e:370:7334')).toBe('20010db885a3000000008a2e03707334');
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3::8a2e:370:7334')).toBe('20010db885a3000000008a2e03707334');
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('::1')).toBe('00000000000000000000000000000001');
    });

    it("should return null for invalid IPv6 addresses", () => {
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3::8a2e:370::7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(null);
        expect(convertToIPv6AddressWithoutEmptyAndSeparator(':2001:db8:85a3:0:0:8a2e:370:7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmptyAndSeparator('2001:db8:85a3:0:0:8a2e:370')).toBe(null);
    });
});

describe("convertToIPv6AddressWithoutEmpty", () => {
    it("should correctly convert valid IPv6 addresses", () => {
        expect(convertToIPv6AddressWithoutEmpty('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3::8a2e:370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
        expect(convertToIPv6AddressWithoutEmpty('::1')).toBe('0000:0000:0000:0000:0000:0000:0000:0001');
    });

    it("should return null for invalid IPv6 addresses", () => {
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3::8a2e:370::7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(null);
        expect(convertToIPv6AddressWithoutEmpty(':2001:db8:85a3:0:0:8a2e:370:7334')).toBe(null);
        expect(convertToIPv6AddressWithoutEmpty('2001:db8:85a3:0:0:8a2e:370')).toBe(null);
    });
});

describe("getPtrAcceptableAddress", () => {
    it("should correctly convert valid IPv4 addresses", () => {
        expect(getPtrAcceptableAddress('192.168.1.1')).toBe('1.1.168.192.in-addr.arpa.');
        expect(getPtrAcceptableAddress('0.0.0.0')).toBe('0.0.0.0.in-addr.arpa.');
        expect(getPtrAcceptableAddress('255.255.255.255')).toBe('255.255.255.255.in-addr.arpa.');
    });

    it("should correctly convert valid IPv6 addresses", () => {
        expect(getPtrAcceptableAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('4.3.3.7.0.7.3.0.e.2.a.8.0.0.0.0.0.0.0.0.3.a.5.8.8.b.d.0.1.0.0.2.ip6.arpa.');
        expect(getPtrAcceptableAddress('2001:db8:85a3:0:0:8a2e:370:7334')).toBe('4.3.3.7.0.7.3.0.e.2.a.8.0.0.0.0.0.0.0.0.3.a.5.8.8.b.d.0.1.0.0.2.ip6.arpa.');
        expect(getPtrAcceptableAddress('2001:db8:85a3::8a2e:370:7334')).toBe('4.3.3.7.0.7.3.0.e.2.a.8.0.0.0.0.0.0.0.0.3.a.5.8.8.b.d.0.1.0.0.2.ip6.arpa.');
        expect(getPtrAcceptableAddress('::1')).toBe('1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa.');
    });

    it("should return null for invalid IPv4 addresses", () => {
        expect(getPtrAcceptableAddress('192.168.1')).toBe(null);
        expect(getPtrAcceptableAddress('192.168.1.256')).toBe(null);
        expect(getPtrAcceptableAddress('192.168.1.1.1')).toBe(null);
        expect(getPtrAcceptableAddress('192.168.1.abc')).toBe(null);
    });

    it("should return null for invalid IPv6 addresses", () => {
        expect(getPtrAcceptableAddress('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(null);
        expect(getPtrAcceptableAddress('2001:db8:85a3::8a2e:370::7334')).toBe(null);
        expect(getPtrAcceptableAddress('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(null);
        expect(getPtrAcceptableAddress(':2001:db8:85a3:0:0:8a2e:370:7334')).toBe(null);
        expect(getPtrAcceptableAddress('2001:db8:85a3:0:0:8a2e:370')).toBe(null);
    });
});

describe("formatIPv6OctetNumbersToStringAddress", () => {
    it("should correctly format valid octet numbers into an IPv6 address", () => {
        expect(formatIPv6OctetNumbersToStringAddress([8193, 3512, 34211, 0, 0, 35342, 880, 29524])).toBe('2001:db8:85a3:0:0:8a0e:370:7354');
        expect(formatIPv6OctetNumbersToStringAddress([8193, 3512, 34211, 0, 0, 35342, 880, 0])).toBe('2001:db8:85a3:0:0:8a0e:370:0');
        expect(formatIPv6OctetNumbersToStringAddress([0, 0, 0, 0, 0, 0, 0, 1])).toBe('0:0:0:0:0:0:0:1');
    });

    it("should correctly handle Uint16Array input", () => {
        expect(formatIPv6OctetNumbersToStringAddress(new Uint16Array([8193, 3512, 34211, 0, 0, 35342, 880, 29524]))).toBe('2001:db8:85a3:0:0:8a0e:370:7354');
    });

    it("should return a null for an empty array", () => {
        expect(formatIPv6OctetNumbersToStringAddress([])).toBe(null);
    });

    it("should correctly handle arrays of length less than 8", () => {
        expect(formatIPv6OctetNumbersToStringAddress([8193, 3512, 34211])).toBe(null);
    });

    it("should correctly handle arrays of length more than 8", () => {
        expect(formatIPv6OctetNumbersToStringAddress([0x2001, 0xdb8, 0x85a3, 0, 0, 0x8a2e, 0x370, 0x7334, 12345])).toBe(null);
    });
});

describe("formatIPv6OctetNumbersToStringAddressPartiallyFromStart", () => {
    it("should correctly format IPv6 addresses from the start of the octet array", () => {
        expect(formatIPv6OctetNumbersToStringAddressPartiallyFromStart([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334], 4)).toBe('2001:db8:85a3:0');
        expect(formatIPv6OctetNumbersToStringAddressPartiallyFromStart([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334], 8)).toBe('2001:db8:85a3:0:0:8a2e:370:7334');
        expect(formatIPv6OctetNumbersToStringAddressPartiallyFromStart([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334], 0)).toBe('');
    });

    it("should correctly handle arrays of length more than 8", () => {
        expect(formatIPv6OctetNumbersToStringAddressPartiallyFromStart([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334, 0x3039], 9)).toBe('2001:db8:85a3:0:0:8a2e:370:7334');
    });

    it("should correctly handle arrays of length less than 0", () => {
        expect(formatIPv6OctetNumbersToStringAddressPartiallyFromStart([0x2001, 0x0db8, 0x85a3], -2)).toBe('');
    });
});