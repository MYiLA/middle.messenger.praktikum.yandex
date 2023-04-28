class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      /*
      * TODO: разобраться с типизацией спред оператора.
      * уйти от apply. listener(...args) Тут возможно пойти через кортеж
      */
      listener.apply(null, ...args);
    });
  }
}

export default EventBus;
