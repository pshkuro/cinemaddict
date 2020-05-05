export default class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }

  notify(changes) {
    this.subscribers.forEach((subscriber) => subscriber(changes));
  }
}
