const Node = function (data, ...connections) {
    return {
        data,
        connections: [...connections],
        addChild(child) {
            this.connections.push(child);
        },
        removeChild(childName) {
            this.connections = this.connections.filter(child => child.data !== childName);
        }
    };
};

const Tree = function (root) {
    return {
        root,

        findNode(name, currentNode = root) {
            if (currentNode.data === name)
                return currentNode;

            for (let child of currentNode.connections) {
                const found = this.findNode(name, child);
                if (found) return found;
            }
            return null;
        },

        addNode(parentName, childName) {
            const parentNode = this.findNode(parentName);
            if (parentNode) {
                parentNode.addChild(Node(childName));
                return parentNode;
            }
            return false;
        },

        removeNode(name, currentNode = root) {
            if (!currentNode) return false;
            currentNode.connections = currentNode.connections.filter(child => child.data !== name);
            for (let child of currentNode.connections) {
                this.removeNode(name, child);
            }
            return true;
        }
    };
};

export function saveTree(tree) {
    return JSON.stringify(tree, null, 3);
}

export function inflateTree(data) {
    return JSON.parse(data);
}

export { Tree, Node };