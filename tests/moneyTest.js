import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suit formatcurrency')

console.log('converts cents into dollars');

if(formatCurrency(2095)==='20.95'){
    console.log('pass');
}else{
    console.log('fail');
}

console.log('works with zero');

if(formatCurrency(0)==='0.00'){
    console.log('pass');
}else{
    console.log('fail');
}

console.log('rounds up to the nearest cents');

if(formatCurrency(2000.5)==='20.01'){
    console.log('pass');
}else{
    console.log('fail');
}

