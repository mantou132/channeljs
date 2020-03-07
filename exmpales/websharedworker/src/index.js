import Channel from 'channeljs';

const worker = new SharedWorker('sharedworker.js');
const channel = new Channel(worker);

channel.sendMessage('hello, worker thread.').then(data => {
  console.log('main:', `worker thread reply "${data}"`);
});
