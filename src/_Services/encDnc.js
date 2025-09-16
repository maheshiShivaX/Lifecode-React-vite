import CryptoJS from 'crypto-js';
const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

export const decryptData = (encryptedData) => {
    const decrypteData = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(encryptedData) },
        secretKey,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    const result = JSON.parse(decrypteData.toString(CryptoJS.enc.Utf8));
    return result;
};
