# TreeFlow JS: Iterative Hierarchical Asset & Metadata Indexer

A robust JavaScript utility that flattens and indexes hierarchical organizational structures or component trees in a sorted sequence. Leverages an iterative stack-based depth-first search approach to efficiently process deeply nested nodes without risking recursive call-stack limits in production apps.

---

## 📋 Project Overview

**TreeFlow JS** is a specialized utility library designed to process, traverse, and flatten hierarchical tree structures—such as corporate department hierarchies, file system nodes, or categorized menu systems—into an ordered, sequential list. By implementing an explicit stack data structure instead of relying on native recursion, TreeFlow JS prevents stack overflow errors when dealing with exceptionally deep trees, making it safe and high-performing for enterprise-scale data transformations.

---

## 🌍 Real-World Conceptual Scenario

Imagine you are building an enterprise dashboard for a multinational corporation. The company's organizational structure, department budgets, and reporting lines are stored as a complex, nested tree of nodes. To generate a master compliance report, export organizational charts, or render searchable directory indexes, the application needs to process every single node in a predictable, sorted hierarchical sequence (left-sub-tree first, then parent, then right-sub-tree). 

Standard recursive functions can easily crash production servers with a `Maximum call stack size exceeded` error if the organizational hierarchy exceeds a few thousand levels. TreeFlow JS solves this by simulating the call stack explicitly, ensuring safe, linear memory management and deterministic traversal speed.

---

## 💡 Core Concept & Algorithm

The underlying algorithmic pattern powering this utility is the **Iterative In-Order Tree Traversal** using an explicit **Last-In, First-Out (LIFO) Stack**. 

Instead of letting the JavaScript runtime manage function execution frames recursively, the algorithm maintains its own state using an array-based stack. It drills down the left branch of the tree as far as possible, pushing nodes onto the stack. Once it hits a dead end (`null`), it pops the last visited node from the stack, records its value, and shifts its focus to the node's right child subtree, repeating the process until all nodes are accounted for.

### Step-by-Step Logic
1. Initialize an empty `result` array to store the final traversal sequence and an empty `stack` array to keep track of pending nodes.
2. Set a pointer variable `curr` to point to the root node of the tree structure.
3. Enter a control loop that continues as long as `curr` is not null or the `stack` still contains items.
4. **Descent Phase:** Traverse leftward as deeply as possible. Push each encountered node onto the `stack` and update `curr` to its left child.
5. **Processing Phase:** When `curr` becomes null, pop the top node from the `stack`. Append its value to the `result` collection.
6. **Pivot Phase:** Shift the `curr` pointer to the right child of the popped node to explore the right subtree in the next iteration.
7. Return the fully populated `result` array once the loop terminates.

---

## ✨ Key Features

* **Zero Recursion Overhead:** Eliminates call-stack overflow vulnerabilities when traversing massive enterprise data trees.
* **Deterministic Sequencing:** Guarantees a consistent, ordered extraction of hierarchical nodes.
* **Lightweight & Dependency-Free:** Built using native vanilla JavaScript with zero external runtime dependencies.
* **Modern ES6+ Design:** Written with clean, modular object-oriented principles and complete JSDoc annotations.

---

## 📊 Example Use Case & Input/Output

### Scenario
Flattening a company department node network to generate a sorted payroll index sequence.

### Input Data Structure (JSON Tree)
```json
{
  "val": 1,
  "left": {
    "val": 2,
    "left": { "val": 4 },
    "right": {
      "val": 5,
      "left": { "val": 6 },
      "right": { "val": 7 }
    }
  },
  "right": {
    "val": 3,
    "right": {
      "val": 8,
      "left": { "val": 9 }
    }
  }
}
