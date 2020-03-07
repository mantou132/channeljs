import Channel from 'channeljs';

const channel = new Channel(self);

channel.onMessage.addListener(data => {
  console.log('window2:', `received "${data}"`);
  return Promise.resolve(false);
});

channel.sendMessage('hello, window1.').then(data => {
  console.log('window2:', `window1 reply "${data}"`);
});
