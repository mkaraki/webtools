import '../../src/styles/net/subnet_table.scss';
import '../../src/styles/table.scss';
import { isIPv6Address, isIPv6AddressWithoutEmpty, convertToIPv6AddressWithoutEmpty, IPv6OctetBasedNetMasks } from "../../src/utils/net/ip_address";
import { calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR } from "../../src/utils/net/ip_subnet";

const addSpanWithOctetFormat = (parent: HTMLElement, octets: number[]) => {
    for (let octet = 0; octet < 8; octet++) {
        const octetSpan = document.createElement('span');
        octetSpan.innerText = octets[octet].toString(16).padStart(4, '0');
        if (octets[octet] === 0) {
            octetSpan.classList.add('all-zero');
        }
        else if (octets[octet] === 0xffff) {
            octetSpan.classList.add('all-one');
        }
        octetSpan.classList.add('octet');
        parent.appendChild(octetSpan);
        if (octet !== 7) {
            parent.appendChild(document.createTextNode(':'));
        }
    }
};

document.getElementById('btn-calculate')?.addEventListener('click', () => {
    const ipAddress = (document.getElementById('ip') as HTMLInputElement).value;

    const pureIp = ipAddress.trim().split('/')[0];
    if (!isIPv6Address(pureIp)) {
        console.error('Invalid IP address: False isIPv6Address');
        alert('Invalid IP address');
        return
    }

    const expandedIp = convertToIPv6AddressWithoutEmpty(pureIp);
    if (expandedIp === null) {
        console.error('Invalid IP address: expandIp failed');
        alert('Invalid IP address');
        return
    }

    if (!isIPv6AddressWithoutEmpty(expandedIp)) {
        console.error('Invalid IP address: False isIPv6AddressWithoutEmpty');
        console.info(expandedIp);
        alert('Invalid IP address');
        return
    }

    const subnetTable = document.getElementById('subnet-table');
    if (subnetTable === null) {
        console.error('subnet-table is null');
        alert('Internal error');
        return;
    }

    subnetTable.innerHTML = '';
    for (let cidr: number = 0; cidr <= 128; cidr++) {
        const [networkAddressOctets, broadCastAddressOctets] = calculateIPv6NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR(expandedIp.split(':').map((v) => parseInt(v, 16)), cidr);

        const tr = document.createElement('tr');

        const tdCidr = document.createElement('td');
        tdCidr.innerText = cidr.toString();
        if (cidr % 64 === 0)
            tdCidr.classList.add('all-one');
        else if (cidr % 16 === 0)
            tdCidr.classList.add('all-zero');
        else if (cidr % 8 === 0)
            tdCidr.classList.add('ip-connected');


        const tdNetworkRange = document.createElement('td');
        addSpanWithOctetFormat(tdNetworkRange, networkAddressOctets);

        tdNetworkRange.appendChild(document.createElement('br'));
        addSpanWithOctetFormat(tdNetworkRange, broadCastAddressOctets)

        const tdNetmask = document.createElement('td');
        addSpanWithOctetFormat(tdNetmask, IPv6OctetBasedNetMasks[cidr]);

        tr.appendChild(tdCidr);
        tr.appendChild(tdNetworkRange);
        tr.appendChild(tdNetmask);

        subnetTable.appendChild(tr);
    }
});