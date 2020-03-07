import {
  MessageChannel as NodeMessageChannel,
  MessagePort as NodeMessagePort,
  Worker as NodeWorker,
} from 'worker_threads';

import { randomStr } from './lib/utils';

let isNode = false;
let isNodeWorker = false;
let nodeParentPort: NodeMessagePort | null = null;
let NativeChannel: any;

if (typeof MessageChannel === 'undefined') {
  const { MessageChannel, isMainThread, parentPort } = require('worker_threads');
  isNode = true;
  isNodeWorker = !isMainThread;
  nodeParentPort = parentPort;
  NativeChannel = MessageChannel;
} else {
  NativeChannel = MessageChannel;
}

const Token = 'channeljs';

// Avoid sending and receiving messages with the same id
let id = 0;
const getId = () => `${randomStr(32)}-${++id}`;

class Message {
  token = Token;
  id: string;
  data: any;

  constructor(data: any, id = getId()) {
    this.data = data;
    this.id = id;
  }
}

export default class Channel {
  constructor(target: Window | WorkerGlobalScope | NodeWorker | MessagePort) {
    this._channel = new NativeChannel();
    this._target = target;
    if (isNode) {
      if (isNodeWorker) {
        const port = nodeParentPort as NodeMessagePort;
        port.on('message', (data: any) => this._onMessage(data, port));
      } else {
        const port = this._target as NodeWorker;
        port.on('message', (data: any) => this._onMessage(data, port));
      }
    } else if (this._target instanceof SharedWorker) {
      this._target.port.addEventListener('message', this._onMessage);
      this._target.port.start();
    } else if (this._target instanceof SharedWorkerGlobalScope) {
      const target = this._target as any;
      target.addEventListener('connect', (e: any) => {
        const port = e.ports[0];
        port.addEventListener('message', (data: any) => this._onMessage(data, port));
      });
    } else {
      const port = this._channel.port1 as MessagePort;
      port.addEventListener('message', this._onMessage);
      port.start();
    }
  }
  _channel: MessageChannel | NodeMessageChannel;
  _target: Window | WorkerGlobalScope | NodeWorker | MessagePort;

  _messagePending = new Map<string, Function>();

  _eventListenerList = new Set<Function>();
  _onMessage = (msg: any, port: MessagePort | NodeMessagePort | NodeWorker = this._channel.port2) => {
    if (!msg || msg.token !== Token) return;
    const { id, data } = msg as Message;

    // this's a receipt message
    const resolve = this._messagePending.get(id);
    if (resolve) return resolve(data);

    this._eventListenerList.forEach(async callback => {
      const res = await callback(data);
      port.postMessage(new Message(res, id));
    });
  };
  onMessage = {
    addListener: (callback: Function) => {
      this._eventListenerList.add(callback);
    },
    removeListener: (callback: Function) => {
      this._eventListenerList.delete(callback);
    },
    hasListener: (callback: Function) => {
      this._eventListenerList.has(callback);
    },
  };

  sendMessage = async (data: any) => {
    const msg = new Message(data);
    if (!isNode && this._target instanceof SharedWorkerGlobalScope) {
      throw new Error('not support!');
    } else if (!isNode && this._target instanceof Window) {
      const target = this._target;
      const port = this._channel.port2 as MessagePort;
      target.postMessage(msg, '*', [port]);
    } else if (isNodeWorker) {
      const port = nodeParentPort as NodeMessagePort;
      port.postMessage(msg);
    } else {
      const target = this._target as MessagePort;
      const port = this._channel.port2 as MessagePort;
      target.postMessage(msg, [port]);
    }

    return new Promise(resolve => {
      this._messagePending.set(msg.id, resolve);
    });
  };
}
