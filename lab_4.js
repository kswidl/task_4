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

  peek(type) {
    const index = this.findIndex(type)

    if (index === -1) {
        return null
    }

    return this.items[index]
  }

  dequeue(type) {
    const index = this.findIndex(type)

    if (index === -1) {
        return null
    }

    return this.items.splice(index, 1)[0]
  }

  findIndex(type) {
    if (this.items.length === 0) {
        return -1
    }

    let targetIndex = 0

    for (let i = 1; i < this.items.length; i++) {
        const current = this.items[i]
        const target = this.items[targetIndex]

        switch (type) {
            case "highest":
                if (
                    current.priority > target.priority ||
                    (current.priority === target.priority && current.order < target.order)
                ) {
                    targetIndex = i
                }
                break
            case "lowest":
                if(
                    current.priority < target.priority ||
                    (current.priority === target.priority && current.order < target.order)
                ) {
                    targetIndex = i
                }
                break
            case "oldest":
                if (current.order < target.order) {
                    targetIndex = i
                }
                break
            case "newest":
                if (current.order > target.order) {
                    targetIndex = i
                }
                break

            default:
                throw new Error("Invalid operation type. Use: highest, lowest, oldest, newest")
        }
    }
    return targetIndex
  }
}

const queue = new BiDirectionalPriorityQueue()

queue.enqueue("Task A", 2)
queue.enqueue("Task B", 5)
queue.enqueue("Task C", 1)
queue.enqueue("Task D", 5)

console.log("Queue size:", queue.size())
console.log("Highest priority:", queue.peek("highest"))
console.log("Lowest priority:", queue.peek("lowest"))
console.log("Oldest item:", queue.peek("oldest"))