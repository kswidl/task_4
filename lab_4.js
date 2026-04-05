class BiDirectionalPriorityQueue {
  constructor() {
    this.items = [];
    this.orderCounter = 0;
  }

  enqueue(item, priority) {
    if (priority === undefined || priority === null || Number.isNaN(priority)) {
      throw new Error("Priority must be a valid value");
    }

    this.items.push({
      item,
      priority,
      order: this.orderCounter++
    });
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}