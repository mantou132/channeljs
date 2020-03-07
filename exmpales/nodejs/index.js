const path = require('path');
const { Worker } = require('worker_threads');

const { default: Channel } = require('../../');
const channel = new Channel(new Worker(path.resolve(__dirname, './worker.js')));

channel.onMessage.addListener(data => {
  console.log('main:', `received "${data}"`);
  return true;
});

channel.sendMessage('hello, worker thread.').then(data => {
  console.log('main:', `worker thread reply "${data}"`);
});
