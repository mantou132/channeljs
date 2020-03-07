import Channel from 'channeljs';
import './window.js';

const channel = new Channel(self);

channel.onMessage.addListener(data => {
  console.log('window1:', `received "${data}"`);
  return true;
});

channel.sendMessage('hello, window2.').then(data => {
  console.log('window1:', `window2 reply "${data}"`);
});
