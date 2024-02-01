import { readdirSync } from "fs";
import { rofiMessage } from "./rofi.js";
import { homedir } from "os";


export default async function checkFolder(dir:string) {
    try {
        readdirSync(dir.replace('~/', homedir()+'/'));
        return true
    } catch (error) {
        rofiMessage(`This directory doesn't exist: ${dir}`)
        return false
    }
}

console.log(await checkFolder('~/Documents/Projects'))