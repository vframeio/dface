/**
 * Math utilities
 * @module utils/math_utils.js
 */

export const rand = (n) => Math.random() * n;
export const randint = (limit) => Math.floor(Math.random() * limit);
export const randsign = () => (Math.random() < 0.5 ? -1 : 1);
export const choice = (list) => list[randint(list.length)];
export const mod = (n, m) => n - m * Math.floor(n / m);
export const hypotenuse = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
