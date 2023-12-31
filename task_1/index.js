// из ТЗ не до конца понятна уникальность id, поэтому ищем id, которых не
// оказалось в translations, а также id, которые 
// попадались в encoded 1 раз

import {encoded, translations} from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

// set exceptions
const excluded = ['groupId', 'service', 'formatSize', 'ca'];

function decode(data, decoder) {
  let encrypKeys = Object.keys(decoder);
  let uniqueIds = new Set(); // unique ids list
  const idsUsage = {};
  let uniqueIdsByUsage; // unique ids by usage

  const decoded = data.map(item => {
    const decodedItem = {};

    Object.keys(item).forEach(key => {

      // check exceptions & 'Id' suffix to proceed decoding
      if (!excluded.includes(key) & key.endsWith('Id')) {
        // get value(id) & check decoder
        if (!encrypKeys.includes(item[key])) {
          // id is unique & cannot be decoded
          uniqueIds.add(item[key]);
          decodedItem[key] = item[key];
        } else {
          // id can be decoded
          decodedItem[key] = decoder[item[key]];
        }

        if (!idsUsage[item[key]]) {
          idsUsage[item[key]] = 1;
        } else {
          idsUsage[item[key]] += 1;
        }

      } else {
        decodedItem[key] = item[key];
      }
    });

    if (!Object.values(idsUsage).includes(1)) {
      uniqueIdsByUsage = 'none';
    } else {
      uniqueIdsByUsage = Object.keys(idsUsage).filter(key => idsUsage[key] === 1);
    }

    return decodedItem;
  });
  
  return [decoded, uniqueIds, uniqueIdsByUsage];
}

// let decoding begin!
let [decoded, uniqueIds, uniqueIdsByUsage] = decode(encoded, translations);

console.log('decoded', decoded);
console.log('unique', [...uniqueIds]);
console.log('uniqueByUsage', uniqueIdsByUsage);