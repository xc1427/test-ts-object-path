import { getPath, createProxy } from "./dist/ts-object-path.es6.js";

const p = createProxy();

// const path = getPath(p.collection[0].nested.one);
// console.log(path);


const get1 = p.collection;

console.log('typeof get1:', typeof get1);
console.log('get1:', get1);

const get2 = get1[0]
const get3 = get2.nested;
const get4 = get3.one;

console.log('typeof get4:', typeof get4);
console.log('get4:', get4);

const pathBis = getPath(get4);
console.log('pathBis:', pathBis);

