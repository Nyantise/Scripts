import { readdirSync } from "fs";
import cmd from "./utils/cmd-exec.js";
import { getProjectPath } from "./utils/projectPath.js";
import rofi from "./utils/rofi.js";

const args:string[] = process.argv.slice(2)

async function main(){
    let folder = await getProjectPath('/bin/modules');
    let tip:string = '';
    if(args.length === 0)tip = 'Modules';
    else{
        switch (args[0].toLowerCase()) {
            case 'menu':
                folder = await getProjectPath('/bin/script');
                tip = '"Script Menu"'
                break;

            case 'github':
                cmd(`node ${folder+'/github/index.js'}`);
                return;

            default:
                return;
        }
    }

    const contents = readdirSync(folder, {withFileTypes:true});
    
    let arr=[];
    for (let content of contents){
        if(content.isDirectory()){
            arr.push(content.name);}};
    
    const resp = await rofi(arr, {tip:tip});
    if(!arr.includes(resp))return console.clear();

    cmd(`node ${folder+'/'+resp+'/index.js'}`);

    console.clear();
}

main();