import { ChildProcess, exec } from "child_process";
import cmd from "./cmd-exec.js";
import { setTimeout } from "timers/promises";

export default async function rofi(list:string[], options?:{
    tip?:string,
}){
    const {tip} = options
    const question = await cmd(
        [`echo "${list.join('\n')}" |`,
        `rofi -dmenu`,
        `-p ${tip||'Options'}`,
        `-config ~/.config/rofi/rofidmenu.rasi`].join(' '));
    return question.stdout
}

export async function cmdNotifiers(command:string, loading?:{
        before?: string
        after?: string
    }) {
        const beforeMsg = loading.before ? 
        rofiMessage(loading.before)
        : undefined;
        
        const resp = await cmd(command);
    
        if(beforeMsg !== undefined) beforeMsg.kill();


        const afterMsg = loading.after ? 
        rofiMessage(loading.after)
        : undefined;
        if(afterMsg !== undefined){
            await setTimeout(1000);
            afterMsg.kill();
        }
        return resp
}

export function rofiMessage(message:string) {
    return exec(`rofi -e "${message}" -config ~/.config/rofi/rofidmenu.rasi`)
}