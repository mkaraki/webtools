import { describe, it, expect } from 'vitest'
import { resolveMojibake } from "../../../src/utils/string/mojibake";

describe("resolveMojibake", () => {
    it("should correctly decode a string wrongly opened as Shift-JIS", () => {
        const str = "縺薙ｓ縺ｫ縺｡縺ｯ";
        const encoding = "SJIS";
        const result = resolveMojibake(str, encoding);
        expect(result).toBe("こんにちは");
    });

    it("should return the original string if the encoding is already UTF-8", () => {
        const str = "こんにちは";
        const encoding = "UTF8";
        const result = resolveMojibake(str, encoding);
        expect(result).toBe(str);
    });
});