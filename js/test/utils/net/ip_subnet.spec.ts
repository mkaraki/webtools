import { describe, it, expect } from 'vitest'
import {
    calculateNetworkAddressOctetFromIpAddressAndNetMask,
    calculateBroadCastAddressOctetFromNetworkAddressAndNetMask,
    calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask,
    calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
    calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
} from "../../../src/utils/net/ip_subnet";

describe("IP subnet calculations", () => {
    it("should correctly calculate network address octet from IPv4 address and netmask (mask:255)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(192, 255);
        expect(result).toBe(192);
    });

    it("should correctly calculate network address octet from IPv4 address and netmask (mask:128)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(192, 128);
        expect(result).toBe(128);
    });

    it("should correctly calculate network address octet from IPv4 address and netmask (mask:0)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(192, 0);
        expect(result).toBe(0);
    });

    it("should correctly calculate network address octet from IPv6 address and netmask (mask:ffff)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(0x2001, 0xffff);
        expect(result).toBe(0x2001);
    });

    it("should correctly calculate network address octet from IPv6 address and netmask (mask:ff00)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(0x2001, 0xff00);
        expect(result).toBe(0x2000);
    });

    it("should correctly calculate network address octet from IPv6 address and netmask (mask:0)", () => {
        const result = calculateNetworkAddressOctetFromIpAddressAndNetMask(0x2001, 0);
        expect(result).toBe(0);
    });

    it("should correctly calculate broadcast address octet from IPv4 network address and netmask (mask:255)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(192, 255, 255);
        expect(result).toBe(192);
    });

    it("should correctly calculate broadcast address octet from IPv4 network address and netmask (mask:224)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(128, 224, 255);
        expect(result).toBe(159);
    });

    it("should correctly calculate broadcast address octet from IPv4 network address and netmask (mask:0)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(192, 0, 255);
        expect(result).toBe(255);
    });

    it("should correctly calculate broadcast address octet from IPv6 network address and netmask (mask:ffff)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(0x2001, 0xffff, 0xffff);
        expect(result).toBe(0x2001);
    });

    it("should correctly calculate broadcast address octet from IPv6 network address and netmask (mask:ff00)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(0x2000, 0xff00, 0xffff);
        expect(result).toBe(0x20ff);
    });

    it("should correctly calculate broadcast address octet from IPv6 network address and netmask (mask:0)", () => {
        const result = calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(0x2001, 0, 0xffff);
        expect(result).toBe(0xffff);
    });

    it("should correctly calculate network and broadcast addresses from IPv4 address and netmask", () => {
        const [networkAddress, broadcastAddress] = calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask([192, 168, 1, 1], [255, 255, 255, 0], 255);
        expect(networkAddress).toEqual([192, 168, 1, 0]);
        expect(broadcastAddress).toEqual([192, 168, 1, 255]);
    });

    it("should correctly calculate network and broadcast addresses from IPv6 address and netmask", () => {
        const [networkAddress, broadcastAddress] = calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask([0x2001, 0xdb8, 0, 0, 0, 0, 0, 1], [0xffff, 0xffff, 0xffff, 0xffff, 0, 0, 0, 0], 0xffff);
        expect(networkAddress).toEqual([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]);
        expect(broadcastAddress).toEqual([0x2001, 0xdb8, 0, 0, 0xffff, 0xffff, 0xffff, 0xffff]);
    });

    it("should correctly calculate IPv4 network and broadcast addresses from IP address and CIDR", () => {
        const [networkAddress, broadcastAddress] = calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR([192, 168, 1, 1], 24);
        expect(networkAddress).toEqual([192, 168, 1, 0]);
        expect(broadcastAddress).toEqual([192, 168, 1, 255]);
    });

    it("should correctly calculate IPv6 network and broadcast addresses from IP address and CIDR", () => {
        const [networkAddress, broadcastAddress] = calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR([0x2001, 0xdb8, 0, 0, 0, 0, 0, 1], 64);
        expect(networkAddress).toEqual([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]);
        expect(broadcastAddress).toEqual([0x2001, 0xdb8, 0, 0, 0xffff, 0xffff, 0xffff, 0xffff]);
    });
});