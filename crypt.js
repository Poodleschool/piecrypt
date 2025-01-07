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

// Basic HTML structure to interact with the encryption functions
document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encryption Tool</title>
</head>
<body>
    <h1>Simple Encryption Tool</h1>
    <textarea id="textInput" placeholder="Enter text to encrypt"></textarea>
    <input type="text" id="keyInput" placeholder="Enter encryption key">
    <button onclick="handleEncrypt()">Encrypt</button>
    <button onclick="handleDecrypt()">Decrypt</button>
    <p>Result: <span id="result"></span></p>

    <script>
        function handleEncrypt() {
            const text = document.getElementById('textInput').value;
            const key = document.getElementById('keyInput').value;
            const encrypted = encryptText(text, key);
            document.getElementById('result').innerText = encrypted;
        }

        function handleDecrypt() {
            const encryptedText = document.getElementById('textInput').value;
            const key = document.getElementById('keyInput').value;
            const decrypted = decryptText(encryptedText, key);
            document.getElementById('result').innerText = decrypted;
        }
    </script>
</body>
</html>
`);
