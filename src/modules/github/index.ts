import cmd from "@/utils/cmd-exec.js";
import { getModulesPath, getProjectPath } from "@/utils/projectPath.js";
import { readdirSync } from "fs";

const folder = await getModulesPath('/github')
const contents = readdirSync(folder, {withFileTypes:true});
let arr=[]
for (let content of contents){
    if(content.isFile() && content.name !== 'index.js'){
        arr.push(content.name.replace('.js', ''))
    }
}

const tip = 'opcoes'
const resp = await cmd(`echo "${arr.join('\n')}" | rofi -normal-window -dmenu -p ${tip}`);
cmd(`node ${folder+'/'+resp.stdout}.js`);