# channeljs

Establish a channel between the main thread and the worker,
can send information using promise-based methods,
the _promise gets resolved when the recipient responds_.

support Node.js and Browser.

## install

```bash
npm i channeljs
```

## usage

main thread:

```js
const channel = new Channel(woker);

channel.onMessage.addListener(data => {
  console.log('Received worker thread message:', data);
  // Reply sender
  return 'pong';
});
```

worker thread:

```js
const channel = new Channel(self);

channel
  .sendMessage('ping')
  // Received reply
  .then(data => console.log('Received main thread message:', data))
  .catch(console.error);
```
