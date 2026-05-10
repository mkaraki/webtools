import { generateIPv6FD00_48 } from '../utils/net/ipv6_fd00_8.ts';
import { formatIPv6OctetNumbersToStringAddressPartiallyFromStart } from '../utils/net/ip_address.ts';

const generate = () => {
    const network = generateIPv6FD00_48();

    const networkAddrStr = formatIPv6OctetNumbersToStringAddressPartiallyFromStart(network, 3);

    const subnetIdNetworkStr = formatIPv6OctetNumbersToStringAddressPartiallyFromStart(network, 4);
    let subnetIdBroadMax = network;
    subnetIdBroadMax[3] = 0xffff;
    const subnetIdNetworkMaxStr = formatIPv6OctetNumbersToStringAddressPartiallyFromStart(subnetIdBroadMax, 4);


    document.querySelectorAll('.gen-network').forEach((el) => {
        el.innerHTML = networkAddrStr;
    });

    document.querySelectorAll('.gen-subnet-from').forEach((el) => {
        el.innerHTML = subnetIdNetworkStr;
    });
    document.querySelectorAll('.gen-subnet-last').forEach((el) => {
        el.innerHTML = subnetIdNetworkMaxStr;
    });
}

document.getElementById('btn-generate')?.addEventListener('click', () => {
    generate();
});

window.onload = () => {
    generate();
};