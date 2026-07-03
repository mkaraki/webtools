// Require ../math.ts

function aspectDisplayFormatter(width: number, height: number) {
    const ratio = width / height;

    // Return well known (and non-safe) ratios
    switch (ratio) {
        case 1.6:
            return '16:10';
        case 0.625:
            return '10:16';
        case 1366/768:
            return 'approx. 16:9';
        case 768/1366:
            return 'approx. 9:16';
        case 2340/1080:
            return '19.5:9';
        case 1080/2340:
            return '9:19.5';
        case 7/3:
            return '21:9';
        case 3/7:
            return '9:21';
    }

    const divisor = gcd(width, height);
    let ratioW = width / divisor;
    let ratioH = height / divisor;

    return `${ratioW}:${ratioH}`;
}

function getImageExtension(mime: string): string {
    switch (mime.toLowerCase()) {
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        case 'image/webp':
            return 'webp';
        default:
            return 'bin';
    }
}

function createCanvasWithSize(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function loadBlobImageToCanvas(blobUrl: string, canvas: HTMLCanvasElement) {
    return new Promise((resolve, _reject) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            resolve(null);
        };
        img.src = blobUrl;
    });
}

function pasteImageToCanvas(canvas: HTMLCanvasElement) {
    return new Promise((resolve, reject) => {
        navigator.clipboard.read().then(data => {
            for (const item of data) {
                if (item.types.includes('image/png')) {
                    item.getType('image/png').then(blob => {
                        const blobUrl = URL.createObjectURL(blob);

                        loadBlobImageToCanvas(blobUrl, canvas).then(() => {
                            URL.revokeObjectURL(blobUrl);
                            resolve(null);
                        });
                    });
                }
            }
        }).catch(err => {
            reject(err);
        });
    });
}
