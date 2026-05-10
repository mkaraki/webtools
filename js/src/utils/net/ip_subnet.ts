import {
    IPv4NumberedOctet,
    IPv4OctetBasedNetMasks,
    IPv6NumberedOctet,
    IPv6OctetBasedNetMasks
} from "./ip_address.ts";

const calculateNetworkAddressOctetFromIpAddressAndNetMask = (ipAddressOctet: number, netMaskOctet: number): number => {
    return ipAddressOctet & netMaskOctet;
}

const calculateBroadCastAddressOctetFromNetworkAddressAndNetMask = (networkAddressOctet: number, netMaskOctet: number, octetMax: number): number => {
    return networkAddressOctet | Math.abs(netMaskOctet - octetMax);
}

const calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndNetMask = (ipAddressOctets: IPv4NumberedOctet, netMaskOctets: IPv4NumberedOctet): [IPv4NumberedOctet, IPv4NumberedOctet] => {
    const networkAddressOctets = ipAddressOctets.map((ipAddressOctet, index) => {
        return calculateNetworkAddressOctetFromIpAddressAndNetMask(ipAddressOctet, netMaskOctets[index] as number);
    }) as IPv4NumberedOctet;
    const broadCastAddressOctets = ipAddressOctets.map((_, index) => {
        return calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(networkAddressOctets[index] as number, netMaskOctets[index] as number, 255);
    }) as IPv4NumberedOctet;
    return [networkAddressOctets, broadCastAddressOctets];
}

const calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndNetMask = (ipAddressOctets: IPv6NumberedOctet, netMaskOctets: IPv6NumberedOctet): [IPv6NumberedOctet, IPv6NumberedOctet] => {
    const networkAddressOctets = ipAddressOctets.map((ipAddressOctet, index) => {
        return calculateNetworkAddressOctetFromIpAddressAndNetMask(ipAddressOctet, netMaskOctets[index] as number);
    }) as IPv6NumberedOctet;
    const broadCastAddressOctets = ipAddressOctets.map((_, index) => {
        return calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(networkAddressOctets[index] as number, netMaskOctets[index] as number, 0xffff);
    }) as IPv6NumberedOctet;
    return [networkAddressOctets, broadCastAddressOctets];
}

const calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR = (ipAddressOctets: IPv4NumberedOctet, cidr: number): [IPv4NumberedOctet, IPv4NumberedOctet] => {
    const netMaskOctets = IPv4OctetBasedNetMasks[cidr] as IPv4NumberedOctet;
    return calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndNetMask(ipAddressOctets, netMaskOctets);
};

const calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR = (ipAddressOctets: IPv6NumberedOctet, cidr: number): [IPv6NumberedOctet, IPv6NumberedOctet] => {
    const netMaskOctets = IPv6OctetBasedNetMasks[cidr] as IPv6NumberedOctet;
    return calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndNetMask(ipAddressOctets, netMaskOctets);
}

export {
    calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
    calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
}