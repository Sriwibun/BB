
import { console } from "inspector";
import fs from "fs/promises"

//#region DUMMY data --------------------

let treeData = await fs.readFile("./init/dummy/tree1.json");
console.log(treeData);



//#endregion


// Start server ----------
const server = await import("../server/server.mjs")