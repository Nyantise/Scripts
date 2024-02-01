import checkFolder from "./checkFolder.js";
import cmd from "./cmd-exec.js";
import { Config } from "./getConfigObject.js";
import rofi, { cmdNotifiers } from "./rofi.js";



export default async function cloneRepo(repo:string, file:Config){
    let actualPath:string;
    if(file.local === "select"){
        //Via only menu, choose a preferred path
        const local = await rofi(file.projectPaths, {tip:"Local"});
        if(!file.projectPaths.includes(local)) return console.clear();

        const dirExists = await checkFolder(local)
        if(!dirExists)return;
        
        await cmdNotifiers(`cd ${local} && gh repo clone ${repo}`, {
        before:"cloning...",
        after:"done",
        })
        actualPath = local;
    }
    if(file.local === "current"){
        //Actual path of terminal
        await cmdNotifiers(`gh repo clone ${repo}`, {
        before:"cloning...",
        after:"done",
        });

        actualPath = (await cmd('pwd')).stdout;
    }


    //Ask to open selected editor
    const confirmOpt = ['Yes', 'No'];
    const confirm = await rofi(confirmOpt, {
        tip:`"Open with your editor? (${file.editorCommand})"`,
        custom: `-theme-str 'inputbar { children: [prompt]; }'`
    });
    if(!confirmOpt.includes(confirm)) return console.clear();
    if(confirm === "No")return console.clear()
    
    const dash = actualPath.endsWith('/') ? '' : '/'
    cmd(`${file.editorCommand} ${actualPath}${dash}${repo}`);
    console.clear();
}