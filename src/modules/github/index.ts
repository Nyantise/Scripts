import cmd from "@/utils/cmd-exec.js";
import { getModulesPath } from "@/utils/projectPath.js";
import rofi from "@/utils/rofi.js";
import { readdirSync } from "fs";

const folder = await getModulesPath('/github')
const contents = readdirSync(folder, {withFileTypes:true});
let arr=[]
for (let content of contents){
    if(content.isFile() && content.name !== 'index.js'){
        arr.push(content.name.replace('.js', ''))
    }
}

const resp = await rofi(arr, {tip:"Options"});
cmd(`node ${folder+'/'+resp}.js`);