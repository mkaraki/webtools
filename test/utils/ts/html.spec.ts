import { describe, it, expect } from 'vitest'
import { putStringToInputOrInnerText } from "../../../src/utils/ts/html";

describe("putStringToInputOrInnerText", () => {
    it("should set the value of an HTMLInputElement", () => {
        const input = document.createElement('input');
        const text = "test value";
        putStringToInputOrInnerText(input, text);
        expect(input.value).toBe(text);
    });

    it("should set the innerText of an HTMLElement", () => {
        const element = document.createElement('div');
        const text = "test text";
        putStringToInputOrInnerText(element, text);
        expect(element.innerText).toBe(text);
    });
});