function gcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return gcd(b, a % b);
    }
  }
  
  function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  }
  
  function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function generatePrime(min, max) {
    while (true) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (isPrime(num)) {
        return num;
      }
    }
  }
  
  function generateKeyPair(p, q) {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = 3;
    while (gcd(phi, e) !== 1) {
      e += 2;
    }
    const d = modInverse(e, phi);
    return {
      publicKey: [e, n],
      privateKey: [d, n]
    };
  }
  
  function encrypt(message, publicKey) {
    const [e, n] = publicKey;
    let ciphertext = '';
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      const encryptedCharCode = BigInt(charCode) ** BigInt(e) % BigInt(n);
      ciphertext += encryptedCharCode.toString() + ' ';
    }
    return ciphertext.trim();
  }
  
  function decrypt(ciphertext, privateKey) {
    const [d, n] = privateKey;
    let message = '';
    const encryptedChars = ciphertext.split(' ');
    for (let i = 0; i < encryptedChars.length; i++) {
      const encryptedCharCode = BigInt(encryptedChars[i]);
      const decryptedCharCode = encryptedCharCode ** BigInt(d) % BigInt(n);
      message += String.fromCharCode(Number(decryptedCharCode));
    }
    return message;
  }
  