# channeljs

Establish a channel between the main thread and the worker,
can send information using promise-based methods,
the _promise gets resolved when the recipient responds_.

support Node.js and Browser.

## problem

Generally use `postMessage` to send messages,
and use `onmessage` to get messages,
but they have no corresponding relationship,
you are not sure whether the obtained message is what you need.

```js
worker.postMessage('1 + 1'); // When do you get results?

window.onmessage = ({ data }) => {
  // `data` is it a `1 + 1` result ?
}
```

## resolve

Add a unique id when sending a message,
Check id when getting message, execute callback.

This library works like this.

## install

```bash
npm i @mantou/channel
```

## usage

main thread:

```js
const channel = new Channel(woker);

channel
  .sendMessage('ping')
  // Received reply
  .then(data => console.log('Received worker thread message:', data))
  .catch(console.error);
```

worker thread:

```js
const channel = new Channel(self);

channel.onMessage.addListener(data => {
  console.log('Received main thread message:', data);
  // Reply sender
  return 'pong';
});
```

## Integration

You can interact with channeljs in other environments, e.g: Flutter, React-Native.
You only need to send and process messages in the following format.

```ts
interface ChannelMessage {
  token: '@@__channeljs__@@';
  type: 'new' | 'reply';
  id: string; // Unique id if new message, source id if reply
  data: any;
}
```