function generatekey(message, key) {
  let newkey = [];
  const lenmessage = message.length;
  const lenkey = key.length;

  const quotient = Math.floor(lenmessage / lenkey);
  const reminder = lenmessage % lenkey;

  for (let i = 0; i < quotient; i++) {
    newkey.push(key);
  }

  newkey.push(key.substr(0, reminder));

  return newkey.join("");
}

function encrypt(message, key) {
  let ciphertext = [];

  for (let i = 0; i < message.length; i++) {
    let text = String.fromCharCode(
      65 + ((message.charCodeAt(i) + key.charCodeAt(i)) % 26)
    );
    ciphertext.push(text);
  }

  return ciphertext.join("");
}

function decrypt(cipher, key) {
  let message = [];

  for (let i = 0; i < cipher.length; i++) {
    const text = String.fromCharCode(
      65 + ((cipher.charCodeAt(i) - key.charCodeAt(i) + 26) % 26)
    );
    message.push(text);
  }

  return message.join("");
}

// const message="GEEKSFORGEEKS"
// const key="AYUSH"

// /* GCYCZFMLYLEIM */

// const newkey=genertorkey(message,key)
// const cipher=encrypt(message,newkey);
// const original=decrypt(cipher,newkey);

// console.log({message,key,newkey,cipher,original})

// {message: "GEEKSFORGEEKS", key: "AYUSH", newkey: "AYUSHAYUSHAYU", cipher: "GCYCZFMLYLEIM", original: "GEEKSFORGEEKS"}

export default { generatekey, encrypt, decrypt };
