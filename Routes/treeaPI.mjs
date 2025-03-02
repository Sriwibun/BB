import express from "express";
import { Tree, Node, saveTree, inflateTree } from "../data/tree.mjs";

const treeRouter = express.Router();
const tree = Tree(Node("Dyrehjem"));


treeRouter.use(express.json());

treeRouter.root.connections.push(
    Node("Hund", Node("Labrador"), Node("Golden Retriever")),
    Node("Katt", Node("Siamese"), Node("Persian"))
);

treeRouter.get("/", (req, res, next) => {

    res.json(tree);

});

treeRouter.post("/add", (req, res, next) => {
    const {parentName, childName} = req.body;

    





export default treeRouter