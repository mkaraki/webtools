<script setup lang="ts">
import { ref } from "vue";
import { calculateSriFormatSHA512HashFromArrayBuffer } from "../../src/utils/hash/hash";
import '../../src/styles/loading.scss';

const sri = ref<string>('');
const uri = ref<string>('');

const appLoading = ref<boolean>(false);

const calculateSriHash = () => {
    uri.value = uri.value.trim();

    if (uri.value === '') {
        return;
    }

    appLoading.value = true;
    sri.value = 'Loading';

    fetch(uri.value)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then((arrayBuffer) => {
            calculateSriFormatSHA512HashFromArrayBuffer(arrayBuffer).then((hash) => {
                sri.value = hash;
            });
        })
        .catch((error) => {
            sri.value = 'Error ' + error.message;
        })
        .finally(() => {
            appLoading.value = false;
        });
}
</script>

<template>
    <main :class="appLoading ? 'loading-dim' : ''">
        <section>
            <h2>From URL</h2>
            <form @submit.prevent="calculateSriHash">
                <div>
                    <label for="uri">URL</label>
                    <input type="url" id="uri" size="60" v-model="uri">
                </div>
                <div>
                    <input type="submit" value="Calc">
                </div>
            </form>
        </section>

        <section>
            <h2>Result</h2>
            <code>{{ sri }}</code>
        </section>

        <section>
            <h2>Usage</h2>
            <div>
                JavaScript:<br />
                <code>&lt;script src="<span>{{ uri ? uri : 'URL' }}</span>" integrity="<span>{{ sri ? sri : 'Hash' }}</span>" crossorigin="anonymous"&gt;&lt;/script&gt;</code>
            </div>
            <br />
            <div>
                CSS:<br />
                <code>&lt;link rel="stylesheet" href="<span>{{ uri ? uri : 'URL' }}</span>" integrity="<span>{{ sri ? sri : 'Hash' }}</span>" crossorigin="anonymous"&gt;</code>
            </div>
        </section>
    </main>
</template>

<style>
code {
    overflow-wrap: break-word;
}

code>span {
    color: red;
}
</style>