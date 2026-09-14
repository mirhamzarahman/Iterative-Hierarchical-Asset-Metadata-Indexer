/**
 * @file TreeNode.js & TreeIndexer.js
 * @description Provides a safe, iterative mechanism for indexing and flattening
 * hierarchical tree structures without risking call-stack overflow.
 */

class TreeNode {
    /**
     * Represents a single node within a hierarchical tree structure.
     * @param {any} val - The payload or identifier stored in the node.
     * @param {TreeNode|null} left - Reference to the left child sub-node.
     * @param {TreeNode|null} right - Reference to the right child sub-node.
     */
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class TreeIndexer {
    /**
     * Performs an iterative in-order traversal of a hierarchical tree.
     * Flattens the node network into an ordered sequential array.
     * 
     * @param {TreeNode|null} root - The root node of the tree structure.
     * @returns {Array<any>} An array containing node values in sorted traversal order.
     */
    static traverse(root) {
        const resultSequence = [];
        const traversalStack = [];
        let currentNode = root;

        // Continue processing while there are nodes to visit or pending items in the stack
        while (currentNode || traversalStack.length > 0) {
            // Traverse as far left as possible, saving nodes onto the stack for later processing
            while (currentNode) {
                traversalStack.push(currentNode);
                currentNode = currentNode.left;
            }

            // Once we hit a null left child, pop the last deferred node from the stack
            currentNode = traversalStack.pop();
            resultSequence.push(currentNode.val);

            // Shift focus to explore the right subtree of the current node
            currentNode = currentNode.right;
        }

        return resultSequence;
    }
}

// --- Example Execution / Verification ---
if (require.main === module) {
    // Constructing a sample hierarchical tree structure
    // Root [1] with left and right branches
    const rootNode = new TreeNode(
        1,
        new TreeNode(
            2,
            new TreeNode(4),
            new TreeNode(5, new TreeNode(6), new TreeNode(7))
        ),
        new TreeNode(
            3,
            null,
            new TreeNode(8, new TreeNode(9), null)
        )
    );

    const indexedSequence = TreeIndexer.traverse(rootNode);
    console.log("Indexed Tree Traversal Sequence:", indexedSequence);
    // Expected output: [4, 2, 6, 5, 7, 1, 3, 9, 8]
}

module.exports = { TreeNode, TreeIndexer };
