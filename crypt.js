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
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            background-color: #f4f4f4;
        }
        textarea, input, button {
            margin: 10px 0;
            padding: 10px;
            width: 300px;
        }
        canvas {
            border: 1px solid #ddd;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Simple Encryption Tool</h1>
    <textarea id="textInput" placeholder="Enter text to encrypt"></textarea>
    <input type="text" id="keyInput" placeholder="Enter encryption key">
    <button onclick="handleEncrypt()">Encrypt Text</button>
    <button onclick="handleDecrypt()">Decrypt Text</button>
    <p>Result: <span id="result"></span></p>
    
    <input type="file" id="imageInput" accept="image/*">
    <button onclick="handleImageEncrypt()">Encrypt Image</button>
    <button onclick="handleImageDecrypt()">Decrypt Image</button>
    <canvas id="canvas"></canvas>

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

        function handleImageEncrypt() {
            const file = document.getElementById('imageInput').files[0];
            const key = document.getElementById('keyInput').value;
            const reader = new FileReader();

            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const encryptedData = encryptImage(imageData.data, key);
                    imageData.data.set(encryptedData);
                    ctx.putImageData(imageData, 0, 0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }

        function handleImageDecrypt() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const key = document.getElementById('keyInput').value;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const decryptedData = decryptImage(imageData.data, key);
            imageData.data.set(decryptedData);
            ctx.putImageData(imageData, 0, 0);
        }
    </script>
</body>
</html>
`);
