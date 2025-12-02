const fs = require('fs');

const rawFile = fs.readFileSync('input.txt', 'utf8');
const lines = rawFile.trim().split(/\r?\n/);
let tot = 0;
let cur = 50;
for (let key of lines) {
    let dir = key[0];
    key = key.slice(1);
    let num = parseInt(key);
    
    cur= (cur + 100) % 100;

}
console.log(tot);