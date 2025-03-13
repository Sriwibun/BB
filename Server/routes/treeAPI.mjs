import express from "express";
import { WorkoutTree, Node, saveTree, inflateTree } from "../../data/tree.mjs";

const treeRouter = express.Router();
const tree = new WorkoutTree();

treeRouter.use(express.json());

tree.root.connections.push(
    new Node("1", new Node ("Upper Body"), new Node ("Push ups"))
);

treeRouter.get("/", (req, res, next) => {
    try {
    res.json(tree);
    } catch (error) {
        console.error("Error fetching tree:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

treeRouter.post("/add", (req, res, next) => {
try {
    const { parentName, childName } = req.body;
    const parentNode = tree.getWorkout(parentName);
    if (!parentNode) {
        return res.status(404).send("Parent not found");
    }
   tree.addWorkout(parentNode.id, childName, { name: childName });
    res.json({ message: `Added ${childName} to ${parentName}` });
    } catch (error) {
        console.error("Error adding workout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//save the tree in JSON
treeRouter.get("/save", (req, res) => {
    try {
        const jsonTree = saveTree(tree);
        res.json({ savedTree: jsonTree });
    } catch (error) {
        console.error("Error saving tree:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//load the tree from JSON
treeRouter.post("/load", (req, res) => {
    try {
        const { jsonTree } = req.body;
        if (!jsonTree) {
            return res.status(400).json({ error: "No JSON-data sent" });
        }

        const loadedTree = inflateTree(jsonTree);
        tree.root = loadedTree.root;
        res.json({ message: "Tree is loaded", tree });
    } catch (error) {
        console.error("Error loading tree:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




export default treeRouter;