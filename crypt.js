function encryptText(text, key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const encryptedData = data.map((byte, index) => byte ^ key.charCodeAt(index % key.length));
    return btoa(String.fromCharCode(...encryptedData));
}

function decryptText(encryptedText, key) {
    const encryptedData = atob(encryptedText).split('').map(char => char.charCodeAt(0));
    const decryptedData = encryptedData.map((byte, index) => byte ^ key.charCodeAt(index % key.length));
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(decryptedData));
}

function encryptImage(imageData, key) {
    const encryptedData = imageData.map((byte, index) => byte ^ key.charCodeAt(index % key.length));
    return encryptedData;
}

function decryptImage(encryptedData, key) {
    const decryptedData = encryptedData.map((byte, index) => byte ^ key.charCodeAt(index % key.length));
    return decryptedData;
}
