import Channel from 'channeljs';

const channel = new Channel(self);

channel.onMessage.addListener(data => {
  console.log('worker:', `received "${data}"`);
  return Promise.resolve(false);
});

channel.sendMessage('hello, main thread.').then(data => {
  console.log('worker:', `main thread reply "${data}"`);
});
