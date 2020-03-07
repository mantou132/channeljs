const { default: Channel } = require('../../');

const channel = new Channel(global);

channel.onMessage.addListener(data => {
  console.log('worker:', `received "${data}"`);
  return Promise.resolve(false);
});

channel.sendMessage('hello, main thread.').then(data => {
  console.log('worker:', `main thread reply "${data}"`);
});
