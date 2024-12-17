import { describe, it, expect } from 'vitest'
import { batchProcessKanaConvert, processKanaConvert } from "../../../src/utils/string/kana_convert";

describe("batchProcessKanaConvert", () => {
    it("should convert Full width Alphabet / Number to Half width and Full space to Half width", () => {
        expect(batchProcessKanaConvert("ＡＢＣ　１２３", ["ZEtoHE", "ZStoHS"])).to.equal("ABC 123");
    });

    it("should throw error when invalid command is passed", () => {
        expect(() => batchProcessKanaConvert("ABC123", ["invalid"])).to.throw(TypeError);
    });
});

describe("processKanaConvert", () => {

    // Simple Test Cases

    it("should convert Full width Alphabet / Number to Half width", () => {
        expect(processKanaConvert("ＡＢＣ１２３", "ZEtoHE")).to.equal("ABC123");
    });
    it("should convert Half width Alphabet / Number to Full width", () => {
        expect(processKanaConvert("ABC123", "HEtoZE")).to.equal("ＡＢＣ１２３");
    });
    it("should convert Full width Space to Half width", () => {
        expect(processKanaConvert("　", "ZStoHS")).to.equal(" ");
    });
    it("should convert Half width Space to Full width", () => {
        expect(processKanaConvert(" ", "HStoZS")).to.equal("　");
    });
    it("should convert ひらがな to カタカナ", () => {
        expect(processKanaConvert("ひらがな", "HGtoKK")).to.equal("ヒラガナ");
    });
    it("should convert カタカナ to ひらがな", () => {
        expect(processKanaConvert("カタカナ", "KKtoHG")).to.equal("かたかな");
    });
    it("should convert 全角カナ to 半角カナ", () => {
        expect(processKanaConvert("アイウエオ", "ZKtoHK")).to.equal("ｱｲｳｴｵ");
    });
    it("should convert 半角カナ to 全角カナ", () => {
        expect(processKanaConvert("ｱｲｳｴｵ", "HKtoZK")).to.equal("アイウエオ");
    });

    // Advanced Test Cases

    it("should handle empty string input", () => {
        expect(processKanaConvert("", "ZEtoHE")).to.equal("");
    });
    it("should handle string with mixed characters", () => {
        expect(processKanaConvert("ABC123ＡＢＣ１２３", "ZEtoHE")).to.equal("ABC123ABC123");
    });
});