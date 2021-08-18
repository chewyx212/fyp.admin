
import HmacSha256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Latin1 from 'crypto-js/enc-latin1';
import Pkcs7 from 'crypto-js/pad-pkcs7';
const secretKey: string = 'MenuworldsV2ZXCV';
const productKey: string = 'QWERMenuworldsV2';

export const Crypto = {
    encryption: (data: any) => {
        console.log(data)
        try {
            // var plaintext = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            // // var encrypted = AES.encrypt(plaintext, Utf8.parse(secretKey),
            // //     {
            // //         iv: Utf8.parse(productKey),
            // //         padding: Pkcs7
            // //     });
            // var ciphertextRaw = Base64.stringify(Utf8.parse(plaintext));
            // var hmac = HmacSha256(ciphertextRaw, secretKey).toString(Latin1);
            // var ciphertext = btoa(btoa(productKey + hmac + ciphertextRaw));
            // return ciphertext

            var plaintext = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            return btoa(plaintext)
        } catch (e) {
            return
        }
    },

    decryption: (data: any) => {
        var c = atob(atob(data))
        var iv2 = c.substr(0, 16);
        console.log(c)
        console.log(iv2)
        if (iv2 === productKey) {
            var hmac = c.substr(16, 32);
            var ciphertextRaw = c.substr(16 +32);
            var bytes = AES.decrypt(ciphertextRaw, Utf8.parse(secretKey), {
                iv: Utf8.parse(productKey),
                padding: Pkcs7
            });
            console.log(bytes)
            console.log("here")
            var calcmac = HmacSha256(ciphertextRaw, secretKey).toString(Latin1);
            console.log(bytes)
            // var originalPlaintext = bytes.toString(Utf8) 
            if (calcmac === hmac) {

                console.log(calcmac)
                console.log(hmac)
                console.log("inside")
            }
            // // console.log(originalPlaintext)
            // // console.log(JSON.parse(atob(originalPlaintext)))
            // // return JSON.parse(atob(originalPlaintext))
            return  
        }
    }
};