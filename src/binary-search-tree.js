const { NotImplementedError } = require("../lib/errors");
// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._tree = null;
  }

  _nodeSearch = (node, data) => {
    if (data < node?.data) {
      if (node.left) {
        return this._nodeSearch(node.left, data);
      } else {
        return node;
      }
    } else if (data > node?.data) {
      if (node.right) {
        return this._nodeSearch(node.right, data);
      } else {
        return node;
      }
    } else {
      return node;
    }
  };

  root() {
    return this._tree;
  }

  add(data) {
    if (this.root()) {
      const node = this._nodeSearch(this.root(), data);

      if (node?.data === data) return;

      if (data < node?.data) {
        node.left = { data, left: null, right: null, parent: node };
      } else {
        node.right = { data, left: null, right: null, parent: node };
      }
    } else {
      this._tree = { data, left: null, right: null, parent: null };
    }
  }

  find(data) {
    if (this.root()) {
      const findNode = this._nodeSearch(this.root(), data);

      if (findNode?.data === data) {
        return findNode;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  remove(data) {
    const delNode = this.find(data);

    const change = (node, value) => {
      if (node?.parent?.left?.data === node.data) {
        node.parent.left = value;
      } else if (node?.parent?.right?.data === node.data) {
        node.parent.right = value;
      } else {
        this._tree = value;
      }
    };

    if (delNode) {
      if (delNode.left && delNode.right) {
        const minNodeData = this.min(delNode.right);
        this.remove(minNodeData);
        delNode.data = minNodeData;
      } else if (delNode.left) {
        delNode.left.parent = delNode.parent;
        change(delNode, delNode.left);
      } else if (delNode.right) {
        delNode.right.parent = delNode.parent;
        change(delNode, delNode.right);
      } else {
        change(delNode, null);
      }
    }
  }

  min(node = this.root()) {
    if (node?.left) {
      return this.min(node.left);
    } else {
      return node.data;
    }
  }

  max(node = this.root()) {
    if (node?.right) {
      return this.max(node.right);
    } else {
      return node.data;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
