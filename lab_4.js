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

console.log("Initial queue size:", queue.size())

console.log("Peek highest:", queue.peek("highest"))
console.log("Peek lowest:", queue.peek("lowest"))
console.log("Peek oldest:", queue.peek("oldest"))
console.log("Peek newest:", queue.peek("newest"))

console.log("Dequeue highest:", queue.dequeue("highest"))
console.log("Dequeue lowest:", queue.dequeue("lowest"))
console.log("Dequeue oldest:", queue.dequeue("oldest"))
console.log("Dequeue newest:", queue.dequeue("newest"))

console.log("Queue is empty:", queue.isEmpty())
console.log("Final queue size:", queue.size())