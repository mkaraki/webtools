import { dnsRecordTypes, resolveSimplyWithDoH } from '../../utils/net/doh_resolver.js';
import { getPtrAcceptableAddress } from '../../utils/net/ip_address.js';
import { putStringToInputOrInnerText } from '../../utils/ts/html.js';

const registerDnsRecordTypesAsHtmlOptions = (
    selectableElement: HTMLSelectElement | HTMLDataListElement,
): void => {
    for (const [code, name] of Object.entries(dnsRecordTypes)) {
        const option = document.createElement('option');
        option.value = code;
        option.innerText = name;
        selectableElement.appendChild(option);
    }
};

const setupDoHResolver = (
    fqdnInput: HTMLInputElement,
    endpointInput: HTMLInputElement | HTMLSelectElement,
    typeInput: HTMLInputElement | HTMLSelectElement,
    resultElement: HTMLElement,
    button: HTMLButtonElement,
): void => {
    button.onclick = () => {
        resolveSimplyWithDoH(
            fqdnInput.value,
            typeInput.value,
            endpointInput.value,
        ).then(result => {
            resultElement.innerText = JSON.stringify(result, null, 2);
            resultElement.innerHTML = '';
            result.forEach(record => {
                const tr = document.createElement('tr');

                const name = document.createElement('td');
                const type = document.createElement('td');
                const ttl = document.createElement('td');
                const data = document.createElement('td');

                name.innerText = record.name;
                type.innerText = record.type.toString();
                ttl.innerText = record.TTL.toString();
                data.innerText = record.data;

                tr.appendChild(name);
                tr.appendChild(type);
                tr.appendChild(ttl);
                tr.appendChild(data);

                resultElement.appendChild(tr);
            });
            button.disabled = false;
        });
    };
};

const setupIPAddressToArpaFqdnConverter = (
    ipInput: HTMLInputElement,
    resultElement: HTMLInputElement | HTMLElement,
    typeInput: HTMLInputElement | HTMLSelectElement,
    button: HTMLButtonElement,
): void => {
    button.onclick = () => {
        const ptr_fqdn = getPtrAcceptableAddress(ipInput.value);
        if (ptr_fqdn === null) {
            putStringToInputOrInnerText(resultElement, 'Invalid IP address');
        }
        else {
            putStringToInputOrInnerText(resultElement, ptr_fqdn);
            typeInput.value = '12' /* PTR */;
        }
    };
};

export {
    registerDnsRecordTypesAsHtmlOptions,
    setupDoHResolver,
    setupIPAddressToArpaFqdnConverter,
}