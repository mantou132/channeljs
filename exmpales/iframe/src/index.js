import Channel from 'channeljs';

const iframe = document.createElement('iframe');

iframe.src = 'http://127.0.0.1:8081/iframe.html';

document.body.append(iframe);

const channel = new Channel(iframe.contentWindow);

channel.onMessage.addListener(data => {
  console.log('window:', `received "${data}"`);
  return true;
});

iframe.onload = () => {
  channel.sendMessage('hello, iframe.').then(data => {
    console.log('window:', `iframe reply "${data}"`);
  });
};
