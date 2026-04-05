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