import {isIPv4Address, IPv4OctetBasedNetMasks, IPv4NumberedOctet} from "../utils/net/ip_address.ts";
import { calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR } from "../utils/net/ip_subnet.ts";

const addSpanWithOctetFormat = (parent: HTMLElement, octets: IPv4NumberedOctet) => {
    for (let octet = 0; octet < 4; octet++) {
        const octetSpan = document.createElement('span');
        octetSpan.innerText = (octets[octet] as number).toString();
        if (octets[octet] === 0) {
            octetSpan.classList.add('all-zero');
        }
        else if (octets[octet] === 255) {
            octetSpan.classList.add('all-one');
        }
        octetSpan.classList.add('octet');
        parent.appendChild(octetSpan);
        if (octet !== 3) {
            parent.appendChild(document.createTextNode('.'));
        }
    }
};

document.getElementById('btn-calculate')?.addEventListener('click', () => {
    const ipAddress = (document.getElementById('ip') as HTMLInputElement).value;

    const pureIp = ipAddress.trim().split('/')[0] ?? '';
    if (!isIPv4Address(pureIp)) {
        alert('Invalid IP address');
        return
    }

    const subnetTable = document.getElementById('subnet-table');
    if (subnetTable === null) {
        console.error('subnet-table is null');
        alert('Internal error');
        return;
    }

    const pureIpOctetSeparatedAddr = pureIp.split('.');
    if (pureIpOctetSeparatedAddr.length != 4) {
        return;
    }

    subnetTable.innerHTML = '';
    for (let cidr: number = 0; cidr <= 32; cidr++) {
        const [networkAddressOctets, broadCastAddressOctets] = calculateIPv4NetworkAddressAndBroadCastAddressFromIpAddressAndCIDR(
            pureIpOctetSeparatedAddr.map((v) => parseInt(v)) as IPv4NumberedOctet,
            cidr
        );

        const tr = document.createElement('tr');

        const tdCidr = document.createElement('td');
        tdCidr.innerText = cidr.toString();
        if (cidr % 8 === 0) {
            tdCidr.classList.add('all-zero');
        }

        const tdNetworkRange = document.createElement('td');
        addSpanWithOctetFormat(tdNetworkRange, networkAddressOctets);

        tdNetworkRange.appendChild(document.createElement('br'));
        addSpanWithOctetFormat(tdNetworkRange, broadCastAddressOctets)

        const tdNetmask = document.createElement('td');
        addSpanWithOctetFormat(tdNetmask, IPv4OctetBasedNetMasks[cidr] as IPv4NumberedOctet);

        tr.appendChild(tdCidr);
        tr.appendChild(tdNetworkRange);
        tr.appendChild(tdNetmask);

        subnetTable.appendChild(tr);
    }
});