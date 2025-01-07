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

function hashKey(key, length) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) % 256;
    }
    const result = new Uint8Array(length);
    for (let j = 0; j < length; j++) {
        result[j] = (hash + j * 17) % 256;
    }
    return result;
}

function encryptImage(imageData, key) {
    const hashedKey = hashKey(key, imageData.length);
    const encryptedData = imageData.map((byte, index) => byte ^ hashedKey[index]);
    return encryptedData;
}

function decryptImage(encryptedData, key) {
    const hashedKey = hashKey(key, encryptedData.length);
    const decryptedData = encryptedData.map((byte, index) => byte ^ hashedKey[index]);
    return decryptedData;
}

// Enhanced HTML structure to interact with the encryption functions
document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encryption Tool</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            background-color: #2c3e50;
            color: #ecf0f1;
        }
        .container {
            background: #34495e;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        h1 {
            margin-bottom: 20px;
        }
        textarea, input, button {
            margin: 10px 0;
            padding: 10px;
            width: 100%;
            border: none;
            border-radius: 5px;
        }
        textarea, input {
            background: #ecf0f1;
            color: #333;
        }
        button {
            background: #2980b9;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background: #3498db;
        }
        canvas {
            margin-top: 20px;
            border: 1px solid #ecf0f1;
        }
        .result {
            margin-top: 20px;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Simple Encryption Tool</h1>
        <textarea id="textInput" placeholder="Enter text to encrypt"></textarea>
        <input type="text" id="keyInput" placeholder="Enter encryption key">
        <button onclick="handleEncrypt()">Encrypt Text</button>
        <button onclick="handleDecrypt()">Decrypt Text</button>
        <p class="result">Result: <span id="result"></span></p>
        
        <input type="file" id="imageInput" accept="image/*">
        <button onclick="handleImageEncrypt()">Encrypt Image</button>
        <button onclick="handleImageDecrypt()">Decrypt Image</button>
        <canvas id="canvas"></canvas>
    </div>

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
    </script>
</body>
</html>
`);
