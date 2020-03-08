import Channel from 'channeljs';

const channel = new Channel(self);

channel.onMessage.addListener(data => {
  console.log('iframe:', `received "${data}"`);
  return Promise.resolve(false);
});

channel.sendMessage('hello, window.').then(data => {
  console.log('iframe:', `window reply "${data}"`);
});
