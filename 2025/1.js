const fs = require('fs');

const rawFile = fs.readFileSync('input.txt', 'utf8');
const lines = rawFile.trim().split(/\r?\n/);
let tot1 = 0;
let tot2 = 0;
let cur = 50;
let prev = 50;
for (let key of lines) {
    let dir = key[0];
    let keynum = key.slice(1);
    let num = parseInt(keynum);
    
    if(dir==="R"){
        tot2 += Math.floor((cur + num)/100);
        cur = (cur + num) % 100;
    }else{
        tot2 += Math.abs(Math.floor((cur-num)/100));
        tot2 -= !(prev);
        cur = (cur - num%100 + 100) % 100;
    }
    if(!cur){
        tot1++;
        tot2++;
    }
    prev = cur;
    console.log(key, tot2, cur);

}


console.log(tot1);
console.log(tot2);


