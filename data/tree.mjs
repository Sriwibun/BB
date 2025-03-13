class Node {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    addChild(node) {
        this.connections.push(node);
    }
}

class WorkoutTree {
    constructor() {
        this.root = new Node("Root");
    }

    getWorkout(name) {
        return this.findNode(this.root, name);
    }

    addWorkout(parentId, childName) {
        const parentNode = this.findNodeById(this.root, parentId);
        if (parentNode) {
            parentNode.addChild(new Node(childName));
        }
    }

    findNode(node, name) {
        if (node.name === name) {
            return node;
        }
        for (const child of node.connections) {
            const result = this.findNode(child, name);
            if (result) {
                return result;
            }
        }
        return null;
    }

    findNodeById(node, id) {
        if (node.id === id) {
            return node;
        }
        for (const child of node.connections) {
            const result = this.findNodeById(child, id);
            if (result) {
                return result;
            }
        }
        return null;
    }
}

function saveTree(tree) {
    return JSON.stringify(tree);
}

function inflateTree(jsonTree) {
    const obj = JSON.parse(jsonTree);
    const tree = new WorkoutTree();
    tree.root = obj.root;
    return tree;
}

export { WorkoutTree, Node, saveTree, inflateTree };