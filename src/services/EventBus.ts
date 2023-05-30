class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  attach(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  detach(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit = (event: string, ...args: unknown[]): void => {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener.call(this, ...args);
    });
  };
}

export default EventBus;
