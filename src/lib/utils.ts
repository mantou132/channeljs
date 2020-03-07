export function randomStr(number = 5, origin = '0123456789abcdefghijklmnopqrstuvwxyz') {
  const len = origin.length;
  let str = '';
  for (let i = 0; i < number; i++) {
    str += origin[Math.floor(Math.random() * len)];
  }
  return str;
}
