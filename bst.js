class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

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

  buildTree(start = 0, end = this.arr.length - 1) {
    if (this.arr.length) {
      if (start > end) {
        return null;
      } else {
        const mid = Math.floor((start + end) / 2);
        const node = new Node(this.arr[mid]);
        node.left = this.buildTree(start, mid - 1);
        node.right = this.buildTree(mid + 1, end);
        this.root = node;
        return node;
      }
    } else {
      throw new Error("Tree needs an Array!");
    }
  }

  insert(value) {
    const node = new Node(value)
    if(!this.root) {
      this.root = node
    } else {
      this.insertValue(this.root, value)
    }
  }

  insertValue (root, value)  {
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
  };

  minValue() {
    let curr = this.root;
    while (curr.left) {
      curr = curr.left;
    }
    return curr.value;
  };

  maxValue() {
    let curr = this.root;
    while (curr.right) {
      curr = curr.right;
    }
    return curr.value;
  };

  deleteValue (value)  {
    this.root = this.deleteKey(this.root, value);
  };

  deleteKey(root, value){
    // Study this
    if (!root) {
      return root;
    }

    if (value < root.value) {
      root.left = this.deleteKey(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteKey(root.right, value);
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
  };
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

const bst = new BinarySearchTree([10, 5, 3, 7, 15]);
bst.buildTree()
bst.insert(8)
bst.deleteValue(15)
prettyPrint(bst.root);
