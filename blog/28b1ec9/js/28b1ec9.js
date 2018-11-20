const a = +prompt('Enter length of 1st side', '0');
const b = +prompt('Enter length of 2nd side', '0');
const angle = +prompt('Enter angle between sides', '0');
const ang = 180;
const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(Math.PI / ang * angle));
const perimeter = a + b + c;
const p = (a + b + c) / 2;
const square = Math.sqrt(p * ((p - a) * (p - b) * (p - c)));
let res;

if (a < 0 || b < 0 || c < 0) {
    res = 'Invalid data';
} else {
    res = `c length: ${parseFloat(c.toFixed(2))}
Triangle squre: ${parseFloat(square.toFixed(2))}
Perimeter: ${parseFloat(perimeter.toFixed(2))}`;
}

console.log(res);
