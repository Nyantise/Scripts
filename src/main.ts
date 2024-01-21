import { readdirSync } from "fs";
import cmd from "./utils/cmd-exec.js";
import { getProjectPath } from "./utils/projectPath.js";

const folder = await getProjectPath('/bin/modules')
const contents = readdirSync(folder, {withFileTypes:true});

let arr=[]
for (let content of contents){
    if(content.isDirectory()){
        arr.push(content.name)
    }
}

const tip = 'modulos'
const resp = await cmd(`echo "${arr.join('\n')}" | rofi -normal-window -dmenu -p ${tip}`);
cmd(`node ${folder+'/'+resp.stdout+'/index.js'}`);