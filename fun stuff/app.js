const messageInput = document.getElementById('message');
const encryptButton = document.getElementById('encryptButton');
const encryptedMessageInput = document.getElementById('encryptedMessage');
const decryptButton = document.getElementById('decryptButton');
const decryptedMessageInput = document.getElementById('decryptedMessage');

encryptButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.length === 0) {
    alert('Please enter a message to encrypt.');
    return;
  }

  const p = generatePrime(100, 1000);
  const q = generatePrime(100, 1000);
  const keyPair = generateKeyPair(p, q);
  const publicKey = keyPair.publicKey;

  const ciphertext = encrypt(message, publicKey);
  encryptedMessageInput.value = ciphertext;
});

decryptButton.addEventListener('click', () => {
  const ciphertext = encryptedMessageInput.value;
  if (ciphertext.length === 0) {
    alert('Please enter a message to decrypt.');
    return;
  }

  const privateKey = keyPair.privateKey;
  const message = decrypt(ciphertext, privateKey);
  decryptedMessageInput.value = message;
});
