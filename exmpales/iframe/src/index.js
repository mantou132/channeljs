import Channel from 'channeljs';

const iframe = document.createElement('iframe');

iframe.src = 'iframe.html';

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
