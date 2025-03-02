import express from "express";
import { Tree, Node, saveTree, inflateTree } from "../data/tree.mjs";

const treeRouter = express.Router();
const tree = Tree(Node("Dyrehjem"));

treeRouter.use(express.json());

tree.root.connections.push(
    Node("Hund", Node("Labrador"), Node("Golden Retriever")),
    Node("Katt", Node("Siamese"), Node("Persian"))
);

treeRouter.get("/", (req, res, next) => {
    res.json(tree);
});

treeRouter.post("/add", (req, res, next) => {
    const { parentName, childName } = req.body;

    const parentNode = tree.findNode(parentName);
    if (!parentNode) {
        return res.status(404).send("Parent not found");
    }
    parentNode.addChild(Node(childName));
    res.json({ message: `Added ${childName} to ${parentName}` });
});

//save the tree in JSON
treeRouter.get("/save", (req, res) => {
    const jsonTree = saveTree(tree);
    res.json({ savedTree: jsonTree });
});

//load the tree from JSON
treeRouter.post("/load", (req, res) => {
    const { jsonTree } = req.body;
    if (!jsonTree) {
        return res.status(400).json({ error: "No JSON-data sent" });
    }

    const loadedTree = inflateTree(jsonTree);
    tree.root = loadedTree.root;

    res.json({ message: "Tree is loaded", tree });
});


const myTree = new Tree(Node("Dyrehjem"));
myTree.addNode("Dyrehjem", "Hund");
myTree.addNode("Dyrehjem", "Katt");
myTree.addNode("Hund", "Labrador");
myTree.addNode("Katt","Siamese");

console.log(myTree.findNode("Hund"));
console.log(myTree.findNode("Katt"));

export default treeRouter;