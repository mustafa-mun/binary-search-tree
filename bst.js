class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// I am implementing linked list queue for less time complexity on BFS (Rather than using array)
class Queue {
  constructor() {
    this.front = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new QueueNode(value);
    if (!this.size) {
      this.front = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  dequeue() {
    const curr = this.front;

    if (this.size === 1) {
      this.front = null;
      this.tail = null;
    } else {
      const next = curr.next;
      this.front = next;
    }
    this.size--;
    return curr;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// this array is for reBalancing
const binaryArray = [];

class BinarySearchTree {
  sortAndRemoveDuplicates(array) {
    const set = new Set(array);
    const sorted = Array.from(set).sort((a, b) => a - b);
    return sorted;
  }

  constructor(arr) {
    this.arr = this.sortAndRemoveDuplicates(arr);
    this.root = null;
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (array.length) {
      if (start > end) {
        return null;
      } else {
        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);
        this.root = node;
        return node;
      }
    } else {
      return array;
    }
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
    } else {
      this.insertValue(this.root, value);
    }
  }

  insertValue(root, value) {
    const newNode = new Node(value);

    if (value < root.value) {
      if (!root.left) {
        root.left = newNode;
      } else {
        this.insertValue(root.left, value);
      }
    } else {
      if (!root.right) {
        root.right = newNode;
      } else {
        this.insertValue(root.right, value);
      }
    }
  }

  minValue(root) {
    if (root.left) {
      return this.minValue(root.left);
    }
    return root.value;
  }

  maxValue(root) {
    if (root.right) {
      return this.maxValue(root.right);
    }
    return root.value;
  }

  deleteValue(value) {
    this.root = this.deleteKey(this.root, value);
  }

  deleteKey(root, value) {
    // Study this
    if (!root) {
      return null;
    }

    //This section is for finding the node with our value
    if (value < root.value) {
      root.left = this.deleteKey(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteKey(root.right, value);
      //This else is for after the finding the node with our value
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      root.value = this.minValue(root.right);
      root.right = this.deleteKey(root.right, root.value);
    }
    return root;
  }

  find(root, value) {
    if (!root) return null;

    if (root.value === value) return root;

    if (value < root.value) {
      return this.find(root.left, value);
    } else {
      return this.find(root.right, value);
    }
  }

  levelOrder() {
    // Breadth First Search
    const queue = new Queue();
    queue.enqueue(this.root);

    while (queue.size) {
      const current = queue.dequeue();
      console.log(current.data.value);

      if (current.data.left) {
        queue.enqueue(current.data.left);
      }

      if (current.data.right) {
        queue.enqueue(current.data.right);
      }
    }
  }

  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder(root) {
    if (root) {
      console.log(root.value);
      this.inOrder(root.left);
      this.inOrder(root.right);
    }
  }

  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }

  height(root) {
    if (!root) return -1;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root, node, count = 0) {
    if (!root) return null;

    if (root === node) return count;

    if (root.value > node.value) {
      return this.depth(root.left, node, (count += 1));
    } else {
      return this.depth(root.right, node, (count += 1));
    }
  }

  isBalanced(root) {
    if (root === null) return true;

    let lh = this.height(root.left);
    let rh = this.height(root.right);

    if (
      Math.abs(lh - rh) <= 1 &&
      this.isBalanced(root.left) == true &&
      this.isBalanced(root.right) == true
    )
      return true;

    return false;
  }

  reBalance(root) {
    if (this.isBalanced(root)) {
      return "Already Balanced";
    }

    const queue = new Queue();
    queue.enqueue(root);

    while (queue.size) {
      const current = queue.dequeue();
      binaryArray.push(current.data.value);
      if (current.data.left) queue.enqueue(current.data.left);
      if (current.data.right) queue.enqueue(current.data.right);
    }

    this.buildTree(binaryArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomArrayGenerator() {
  const output = [];
  for (let i = 0; i < 8; i++) {
    output.push(Math.floor(Math.random() * 200));
  }
  return output;
}

const bst = new BinarySearchTree(randomArrayGenerator());
bst.buildTree(bst.arr);
console.log("Is balanced? ");
console.log(bst.isBalanced(bst.root));
console.log("Level Order =>");
bst.levelOrder();
console.log("======================");
console.log("Pre order =>");
bst.preOrder(bst.root);
console.log("======================");
console.log("In order =>");
bst.inOrder(bst.root);
console.log("======================");
console.log("Post Order =>");
bst.postOrder(bst.root);
console.log("======================");
console.log("Unbalancing the tree...");
bst.insert(100);
bst.insert(200);
bst.insert(300);
console.log("Is balanced? ");
console.log(bst.isBalanced(bst.root));
console.log("Balancing the tree...");
bst.reBalance(bst.root);
console.log("Is balanced? ");
console.log(bst.isBalanced(bst.root));
console.log("Prettier version of tree =>");
prettyPrint(bst.root);
