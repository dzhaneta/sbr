import {encoded, translations} from './data.js';

console.log("Let's rock");
// console.log(encoded, translations)

const excluded = ['groupId', 'service', 'formatSize', 'ca'];
let uniqueIds = []; // unique ids list

function decode(data, encryption) {
  let encrypKeys = Object.keys(encryption);
  let unique = [];

  let newData = data.map(card => {
    let cardKeys = Object.keys(card);

    cardKeys.forEach(key => {

      // check exceptions to proceed decoding
      if (!excluded.includes(key)) {

        // get value(id) & check translations
        if (!encrypKeys.includes(card[key])) {
          // id is unique
          unique.push(card[key]);
        } else {
          // id can be encoded
          console.log('card[key]', card[key]);
          console.log('encryption[key]', encryption[card[key]]);
          card[key] = encryption[card[key]];
        }

      }
      
    });

    return card;

  });

  uniqueIds = [...new Set(unique)];
  return newData;
}

// let encoding begin!
let decoded = decode(encoded, translations);

console.log('decoded', decoded);
console.log('unique', uniqueIds);
