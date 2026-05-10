import { registerDnsRecordTypesAsHtmlOptions, setupDoHResolver, setupIPAddressToArpaFqdnConverter } from "../pageLogic/net/doh_client.js";

registerDnsRecordTypesAsHtmlOptions(document.getElementById('typeset') as HTMLDataListElement);

setupDoHResolver(
    document.getElementById('name') as HTMLInputElement,
    document.getElementById('resolver') as HTMLSelectElement,
    document.getElementById('type') as HTMLInputElement,
    document.getElementById('result') as HTMLElement,
    document.getElementById('btn-resolve') as HTMLButtonElement,
);

setupIPAddressToArpaFqdnConverter(
    document.getElementById('ip') as HTMLInputElement,
    document.getElementById('name') as HTMLInputElement,
    document.getElementById('type') as HTMLInputElement,
    document.getElementById('btn-convert') as HTMLButtonElement,
);