const Node = (value) => {
  return {
    value,
    left: null,
    right: null,
  };
};

const BinarySearchTree = (arr) => {
  const sortAndRemoveDuplicates = (array) => {
    const set = new Set(array);
    const sorted = Array.from(set).sort((a, b) => a - b);
    return sorted;
  };

  const sortedArr = sortAndRemoveDuplicates(arr);

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const buildTree = (start = 0, end = sortedArr.length - 1) => {
    if (start > end) {
      return null;
    } else {
      const mid = Math.floor((start + end) / 2);
      const node = Node(sortedArr[mid]);
      node.left = buildTree(start, mid - 1);
      node.right = buildTree(mid + 1, end);
      return node;
    }
  };

  let root = buildTree();

  const insert = (root, value) => {
    const newNode = Node(value);
    if (value < root.value) {
      if (!root.left) {
        root.left = newNode;
      } else {
        insert(root.left, value)
      }
    } else {
      if(!root.right) {
        root.right = newNode
      } else {
        insert(root.right, value)
      }
    }
  };

  return {
    root,
    prettyPrint,
    insert
  };
};

const bst = BinarySearchTree([1, 2, 3, 4, 4, 5, 10, 6, 7, 8]);

bst.prettyPrint(bst.root)