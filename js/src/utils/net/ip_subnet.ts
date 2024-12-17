import { IPv4OctetBasedNetMasks, IPv6OctetBasedNetMasks } from "./ip_address";

const calculateNetworkAddressOctetFromIpAddressAndNetMask = (ipAddressOctet: number, netMaskOctet: number): number => {
    return ipAddressOctet & netMaskOctet;
}

const calculateBroadCastAddressOctetFromNetworkAddressAndNetMask = (networkAddressOctet: number, netMaskOctet: number, octetMax: number): number => {
    return networkAddressOctet | Math.abs(netMaskOctet - octetMax);
}

const calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask = (ipAddressOctets: number[], netMaskOctets: number[], octetMax: number): [number[], number[]] => {
    const networkAddressOctets = ipAddressOctets.map((ipAddressOctet, index) => {
        return calculateNetworkAddressOctetFromIpAddressAndNetMask(ipAddressOctet, netMaskOctets[index]);
    });
    const broadCastAddressOctets = ipAddressOctets.map((_, index) => {
        return calculateBroadCastAddressOctetFromNetworkAddressAndNetMask(networkAddressOctets[index], netMaskOctets[index], octetMax);
    });
    return [networkAddressOctets, broadCastAddressOctets];
}

const calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR = (ipAddressOctets: number[], cidr: number): [number[], number[]] => {
    const netMaskOctets = IPv4OctetBasedNetMasks[cidr];
    return calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask(ipAddressOctets, netMaskOctets, 255);
};

const calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR = (ipAddressOctets: number[], cidr: number): [number[], number[]] => {
    const netMaskOctets = IPv6OctetBasedNetMasks[cidr];
    return calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask(ipAddressOctets, netMaskOctets, 0xffff);
}

export {
    calculateNetworkAddressOctetFromIpAddressAndNetMask,
    calculateBroadCastAddressOctetFromNetworkAddressAndNetMask,
    calculateNetworkAddressAndBroadCastAddressFromIpAddressAndNetMask,
    calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
    calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR,
}