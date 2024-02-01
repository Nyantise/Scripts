import cmd from "@/utils/cmd-exec.js";
import { getModulesPath } from "@/utils/projectPath.js";
import rofi from "@/utils/rofi.js";
import { readdirSync } from "fs";

async function githubModule(){
    const folder = await getModulesPath('/github');
    const contents = readdirSync(folder, {withFileTypes:true});
    let tempArr=[];
    for (const content of contents){
        if(content.isFile() &&
        content.name !== 'index.js'&&
        content.name.includes('.js')){
            tempArr.push(content.name.replace('.js', ''));
        }};

    tempArr = tempArr.map((el:string)=>{
        return el.split('_').map(word =>{
            return word[0].toUpperCase()+word.slice(1)}).join(' ')});

    const resp = await rofi(tempArr, {tip:"Github"});
    if(!tempArr.includes(resp))return console.clear();

    cmd(`node ${folder+'/'+resp.toLowerCase().replaceAll(' ', '_')}.js`);

    console.clear();
}

githubModule()