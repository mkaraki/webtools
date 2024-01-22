import { describe, it, expect } from 'vitest'
import { generateIPv6FD00_48 } from "../../../src/utils/net/ipv6_fd00_8";

describe("generateIPv6FD00_48", () => {
    it("should generate an 8-element Uint16Array", () => {
        const result = generateIPv6FD00_48();
        expect(result).toBeInstanceOf(Uint16Array);
        expect(result.length).toBe(8);
    });

    it("should generate an address with the fd00::/8 prefix", () => {
        const result = generateIPv6FD00_48();
        expect((result[0] & 0xff00)).toBe(0xfd00);
    });

    it("should generate an address with zeros in the last 5 octets", () => {
        const result = generateIPv6FD00_48();
        for (let i = 3; i < 8; i++) {
            expect(result[i]).toBe(0);
        }
    });
});