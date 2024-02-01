import { ChildProcess, exec } from "child_process";
import cmd from "./cmd-exec.js";
import { setTimeout } from "timers/promises";
import getConfigObject from "./getConfigObject.js";

export default async function rofi(list:string[], options?:{
    tip?:string,
    custom?: string
}){
    const {file} = await getConfigObject();
    if(file === undefined) throw "error";

    const {tip, custom} = options
    const question = await cmd([
        `echo "${list.join('\n')}" |`,
        `rofi -dmenu`,
        `-p ${tip||'Options'}`,
        `-config ${file.rofiConfig}`,
        `${custom}`
    ].join(' '));
    return question.stdout
}

export async function cmdNotifiers(command:string, loading?:{
        before?: string
        after?: string
    }) {
        const beforeMsg = loading.before ? 
        await rofiMessage(loading.before)
        : undefined;
        
        const resp = await cmd(command);
    
        if(beforeMsg !== undefined) beforeMsg.kill();


        const afterMsg = loading.after ? 
        await rofiMessage(loading.after)
        : undefined;
        if(afterMsg !== undefined){
            await setTimeout(1000);
            afterMsg.kill();
        }
        return resp
}

export async function rofiMessage(message:string) {
    const {file} = await getConfigObject();
    if(file === undefined) throw "error";

    return exec(`rofi -e "${message}" -config ${file.rofiConfig}`)
}