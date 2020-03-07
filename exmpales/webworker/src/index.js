import Channel from 'channeljs';

const channel = new Channel(new Worker('worker.js'));

channel.onMessage.addListener(data => {
  console.log('main:', `received "${data}"`);
  return true;
});

channel.sendMessage('hello, worker thread.').then(data => {
  console.log('main:', `worker thread reply "${data}"`);
});
