import { readdirSync } from "fs";
import cmd from "./utils/cmd-exec.js";
import { getProjectPath } from "./utils/projectPath.js";
import rofi from "./utils/rofi.js";

const folder = await getProjectPath('/bin/modules')
const contents = readdirSync(folder, {withFileTypes:true});

let arr=[]
for (let content of contents){
    if(content.isDirectory()){
        arr.push(content.name)
    }
}

const resp = await rofi(arr, {tip:"Modules"});
cmd(`node ${folder+'/'+resp+'/index.js'}`);