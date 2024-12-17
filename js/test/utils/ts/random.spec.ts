import { describe, it, expect, vi } from 'vitest'
import {
    generateRandomUint8,
    generateSecureRandomUint8,
    generateSecureRandomUint16,
    generateSecureRandomBigUint64,
} from "../../../src/utils/ts/random";


describe("generateRandomUint8", () => {
    it("should return an array of the correct length", () => {
        const length = 10;
        const result = generateRandomUint8(length);
        expect(result).toBeInstanceOf(Uint8Array);
        expect(result.length).toBe(length);
    });

    it("should return an array with only integer values", () => {
        const result = generateRandomUint8(10);
        result.forEach(value => {
            expect(Number.isInteger(value)).toBe(true);
        });
    });

    it("should return an array with values in the range 0-255", () => {
        const result = generateRandomUint8(10);
        result.forEach(value => {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(255);
        });
    });
});

describe("generateSecureRandom", () => {
    vi.spyOn(window.crypto, 'getRandomValues');

    describe("generateSecureRandomUint8", () => {
        it("should call window.crypto.getRandomValues", () => {
            const length = 10;
            const result = generateSecureRandomUint8(length);
            expect(window.crypto.getRandomValues).toHaveBeenCalledWith(result);
        });

        it("should return an array of the correct length", () => {
            const length = 10;
            const result = generateSecureRandomUint8(length);
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(length);
        });

        it("should return an array with only integer values", () => {
            const result = generateSecureRandomUint8(10);
            result.forEach(value => {
                expect(Number.isInteger(value)).toBe(true);
            });
        });

        it("should return an array with values in the range 0-255", () => {
            const result = generateSecureRandomUint8(10);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(255);
            });
        });
    });

    describe("generateSecureRandomUint16", () => {
        it("should call window.crypto.getRandomValues", () => {
            const length = 10;
            const result = generateSecureRandomUint16(length);
            expect(window.crypto.getRandomValues).toHaveBeenCalledWith(result);
        });

        it("should return an array of the correct length", () => {
            const length = 10;
            const result = generateSecureRandomUint16(length);
            expect(result).toBeInstanceOf(Uint16Array);
            expect(result.length).toBe(length);
        });

        it("should return an array with only integer values", () => {
            const result = generateSecureRandomUint16(10);
            result.forEach(value => {
                expect(Number.isInteger(value)).toBe(true);
            });
        });

        it("should return an array with values in the range 0-65535", () => {
            const result = generateSecureRandomUint16(10);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(65535);
            });
        });
    });

    describe("generateSecureRandomBigUint64", () => {
        it("should call window.crypto.getRandomValues", () => {
            const length = 10;
            const result = generateSecureRandomBigUint64(length);
            expect(window.crypto.getRandomValues).toHaveBeenCalledWith(result);
        });

        it("should return an array of the correct length", () => {
            const length = 10;
            const result = generateSecureRandomBigUint64(length);
            expect(result).toBeInstanceOf(BigUint64Array);
            expect(result.length).toBe(length);
        });

        it("should return an array with only BigInt values", () => {
            const result = generateSecureRandomBigUint64(10);
            result.forEach(value => {
                expect(typeof value).toBe('bigint');
            });
        });

        it("should return an array with values in the range 0-18446744073709551615", () => {
            const result = generateSecureRandomBigUint64(10);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(BigInt(0));
                expect(value).toBeLessThanOrEqual(BigInt('18446744073709551615'));
            });
        });
    });
});
